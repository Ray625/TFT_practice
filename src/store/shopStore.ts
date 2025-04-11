import { create } from "zustand"
import champion from "../assets/tft-champion-set13.json"
import shopRates from "../assets/tft-shop-drop-rates-data.json"
import { useSiteStore } from "./siteStore"
import { ChampionData, ChampionJSON, ShopStore, MatchesTuple, MatchesType } from "../types/shopStoreTypes"

const initializeBanner = (): Record<string,ChampionData> => {
  // 將json資料複製出來，並給角色加上卡池張數，再存於state中備用
  const championList = { ...champion.data } as ChampionJSON["data"]
  Object.values(championList).forEach((item) => {
    (item as ChampionData).count = [30, 25, 18, 10, 9, 9][item.tier - 1] || 0
  })
  return championList as Record<string, ChampionData>
}

export const useShopStore = create<ShopStore>((set, get) => {
  // 找尋場上及備戰席相同卡牌
  const findMatchingCards = (card: ChampionData, willBeStars: number): MatchesType => {
    const { space, seat } = useSiteStore.getState()
    let matches: MatchesType = []

    const toMatchTuple = (i: number, index: number): MatchesTuple => [i === 0 ? "space" : "seat", index]

    if (willBeStars === 2) {
      matches = [space, seat]
        .flatMap((list, i) =>
          list.flatMap((item, index) =>
            item.id === card.id && item.star === willBeStars - 1
              ? [toMatchTuple(i, index)]
              : []
          )
        )
    }

    if (willBeStars === 3) {
      matches = [space, seat]
        .flatMap((list, i) =>
          list.flatMap((item, index) =>
            item.id === card.id
              ? [toMatchTuple(i, index)]
              : []
          )
        )
    }

    return matches
  }

  // 設置升星動畫
  const playMergeAnimation = (site: "seat" | "space", index: number, willBeStars: number) => {
    const { setSpaceAnimate, setSeatAnimate } = useSiteStore.getState()

    if (site === "space") {
      setSpaceAnimate((prev) => new Map(prev).set(index, willBeStars))
      setTimeout(() => {
        setSpaceAnimate((prev) => {
          const newMap = new Map(prev)
          newMap.delete(index)
          return newMap
        })
      }, 1000)
    } else {
      setSeatAnimate((prev) => new Map(prev).set(index, willBeStars))
      setTimeout(() => {
        setSeatAnimate((prev) => {
          const newMap = new Map(prev)
          newMap.delete(index)
          return newMap
        })
      }, 1000)
    }
  }

  // 合成卡牌
  const mergeCards = (matches: MatchesType, card: ChampionData, willBeStars: number) => {
    const { seat, space, setSeat, setSpace } = useSiteStore.getState()
    let updatedSpace = [...space]
    let updatedSeat = [...seat]
    let mergeSite = matches[0][0] // 合成的場地
    let mergeIndex = matches[0][1] // 合成的位置

    // 將多餘卡牌清除
    matches.slice(1).forEach(([site, index]: [string, number]) => {
      if (site === "space") updatedSpace[index] = {}
      if (site === "seat") updatedSeat[index] = {}
    })

    // 將卡牌升星
    if (mergeSite === "space") updatedSpace[mergeIndex] = {
      ...card,
      star: willBeStars
    }
    if (mergeSite === "seat") updatedSeat[mergeIndex] = {
      ...card,
      star: willBeStars
    }

    // 設置動畫
    playMergeAnimation(mergeSite, mergeIndex, willBeStars)

    setSpace(updatedSpace)
    setSeat(updatedSeat)
  }

  // 購買卡牌時若玩家擁有相同卡牌則可升星
  const getUpStars = (card: ChampionData, willBeStars: number) => {
    const matches = findMatchingCards(card, willBeStars)

    mergeCards(matches, card, willBeStars)
  }

  return {
    level: 8,
    xp: 0,
    total: 50,
    shopList: Array.from({ length: 5 }, () => ({})),
    banner: initializeBanner(),

    setLevel: (updater) => {
      set((state) => ({
        level: typeof updater === "function" ? updater(state.level) : updater,
      }))
    },

    setTotal: (updater) => {
      set((state) => ({
        total: typeof updater === "function" ? updater(state.total) : updater,
      }))
    },

    // 刷新商店
    drawCard: () => {
      const { level, total, shopList, banner } = get()
      const { playerSide } = useSiteStore.getState()
      if (total < 2) return

      let cards = []
      let shop: ChampionData[] = []
      let tempBanner = { ...banner }

      const levelRate = shopRates.data.Shop[`${level - 1}`].dropRatesByTier

      // 將商店上一輪沒有買下的卡放回牌池
      shopList.forEach((card) => {
        if (Object.keys(card).length === 0) return
        const key = Object.keys(tempBanner).find((key) => tempBanner[key].name === card.name)
        if (key) {
          tempBanner[key] = {
            ...tempBanner[key],
            count: tempBanner[key].count + 1,
          }
        }
      })

      // 如果有某一費用牌池抽空，則須重新計算機率
      const availableLevels = levelRate.filter((level) => {
        return Object.values(tempBanner).some(
          (card) => card.tier === level.cost && card.count > 0
        )
      })

      const totalRate = availableLevels.reduce(
        (sum, level) => sum + level.rate,
        0
      )

      const finalRate =
        totalRate === 100
          ? levelRate
          : availableLevels.map((level) => ({
              cost: level.cost,
              rate: (level.rate / totalRate) * 100,
          }))

      // 抽出5張卡牌之[費用]，由等級決定抽出之機率
      for (let i = 0; i < 5; i++) {
        let rateSum = 0
        const starIndex = Math.floor(Math.random() * 100)
        for (let item of finalRate) {
          rateSum += item.rate
          if (starIndex < rateSum) {
            cards.push(item.cost)
            break
          }
        }
      }

      // 再由費用列表中，對該費用抽出一張卡牌，若某一張卡牌使用者已擁有三星(9張相同卡牌)，則將該卡牌排除後再抽出
      cards.forEach((cardTier) => {
        let bannerTotal = 0
        Object.entries(tempBanner).forEach(([key, cardData]) => {
          if (cardData.tier === cardTier) {
            if (playerSide[key]?.owned >= 9) {
              return
            }
            bannerTotal += cardData.count
          }
        })

        let cardTotal = 0
        const cardIndex = Math.floor(Math.random() * bannerTotal)
        for (let [key, cardData] of Object.entries(tempBanner)) {
          if (cardData.tier !== cardTier) continue
          if (cardData.count === 0) continue
          if (playerSide[key]?.owned >= 9) continue
          cardTotal += cardData.count
          if (cardIndex < cardTotal) {
            tempBanner[key] = {
              ...tempBanner[key],
              count: tempBanner[key].count - 1,
            }
            shop.push(cardData)
            break
          }
        }
      })

      set({
        banner: tempBanner,
        shopList: shop,
        total: total - 2,
      })
    },

    // 購買經驗
    buyXp: () => {
      const { level, total, xp } = get()
      const xpList = [2, 2, 6, 10, 20, 36, 48, 76, 84, 0]
      const levelNeededXp = xpList[level - 1]

      if (level >= 10) return // 滿等時無法購買經驗
      if (total < 4) return // 錢不夠時無法購買

      // 當升級xp不會造成等級提升時
      if (levelNeededXp - xp > 4) {
        set({
          total: total - 4,
          xp: xp + 4,
        })
      }

      // 當升級xp會造成等級提升時
      if (levelNeededXp - xp <= 4) {
        set({
          total: total - 4,
          xp: 4 - levelNeededXp + xp,
          level: level + 1,
        })
      }
    },

    // 購買卡牌
    buyCard: (card, index) => {
      const { total, shopList } = get()
      const { playerSide, setPlayerSide, seat, setSeat } =
        useSiteStore.getState()

      const cost = card.tier
      if (total < cost) return

      // 檢查購買後是否升星
      const canIncreaseStars =
        playerSide[card.id]?.owned === 2 || playerSide[card.id]?.owned === 5
      const canIncreaseThreeStars = playerSide[card.id]?.owned === 8

      // 檢查備戰席是否已滿
      let full = true
      for (let item of Object.values(seat)) {
        if (Object.keys(item).length === 0) {
          full = false
          break
        }
      }

      // 如果購買英雄無法升星，備戰席又已經滿了，則return
      if (full && !canIncreaseStars && !canIncreaseThreeStars) return

      // 以下開始購買流程，從商店將牌取出
      set({
        shopList: shopList.map((item, i) => (i === index ? {} : item)),
      })

      // 若購買卡牌後可升至二星
      if (canIncreaseStars) {
        getUpStars(card, 2)
      }

      // 若購買卡牌後可升至三星
      if (canIncreaseThreeStars) {
        getUpStars(card, 3)
      }

      // 將卡牌加入備戰席
      if (!canIncreaseStars && !canIncreaseThreeStars) {
        setSeat((prev) => {
          let done = false
          console.log("card", card)
          return prev.map((item) => {
            if (!item.name && !done) {
              done = true
              return {
                ...card,
                star: 1,
              }
            }
            return item
          })
        })
      }

      // 計入玩家擁有卡牌數量統計
      setPlayerSide((prev) => {
        const newCounter = { ...prev }
        if (!newCounter[card.id]) {
          newCounter[card.id] = {
            owned: 0,
          }
        }
        return {
          ...newCounter,
          [card.id]: {
            owned: newCounter[card.id].owned + 1,
          },
        }
      })

      // 扣除購買英雄費用
      set({
        total: total - cost,
      })
    },

    // 販賣卡牌
    sellCard: (hoverCard) => {
      const { banner, total } = get()
      const { setSeat, setSpace, setPlayerSide, setHoverCard } =
        useSiteStore.getState()
      const cardCount = [1, 3, 9][hoverCard.cardData.star - 1]

      // 增加卡池該卡牌數量
      if (hoverCard) {
        const key = Object.keys(banner).find(
          (key) => banner[key].name === hoverCard.cardData.name
        )

        if (key)
          set({
            banner: {
              ...banner,
              [key]: {
                ...banner[key],
                count: banner[key].count + cardCount,
              },
            },
          })
      }

      // 將場地內位置清空
      if (hoverCard.place === "seat") {
        setSeat((prev) =>
          prev.map((item, index) => (index === hoverCard.index ? {} : item))
        )
      }
      if (hoverCard.place === "space") {
        setSpace((prev) =>
          prev.map((item, index) => (index === hoverCard.index ? {} : item))
        )
      }

      // 從玩家擁有卡牌統計中扣除該卡牌
      setPlayerSide((prev) => {
        return {
          ...prev,
          [hoverCard.cardData.id]: {
            owned: prev[hoverCard.cardData.id].owned - cardCount,
          },
        }
      })

      // 獲得販賣卡牌費用
      set({
        total: total + hoverCard.cardData.tier * cardCount
      })

      // 將存放所選卡牌state清空
      setHoverCard(null)
    },

    // 將卡牌移至備戰席與戰區
    placeCard: (hoverCard) => {
      const { level } = get()
      const { seat, space, setSeat, setSpace, setHoverCard } =
        useSiteStore.getState()

      // 對著備戰區卡牌使用時
      if (hoverCard.place === "seat") {
        // 檢查戰區位置是否已達等級上限(可放置張數與等級相同)
        let full = true

        const spaceCount = space.reduce((acc, item) => {
          if (Object.keys(item).length !== 0) acc += 1
          return acc
        }, 0)

        if (spaceCount < level) full = false

        // 若戰區已滿則return
        if (full) return

        // 將備戰區該位置清空
        setSeat((prev) => prev.map((item, i) => (i === hoverCard.index ? {} : item)))

        // 移至戰區
        setSpace((prev) => {
          let done = false
          return prev.map((item) => {
            if (!item.name && !done) {
              done = true
              return {
                ...hoverCard.cardData,
              }
            }
            return item
          })
        })
      }

      // 對著戰區卡牌使用時
      if (hoverCard.place === "space") {
        // 檢查備戰區是否已滿
        let full = true

        for (let item of seat) {
          if (Object.keys(item).length === 0) {
            full = false
            break
          }
        }

        // 若備戰區已滿則return
        if (full) return

        // 將戰區該位置清空
        setSpace((prev) => prev.map((item, i) => (i === hoverCard.index ? {} : item)))

        // 移至備戰區
        setSeat((prev) => {
          let done = false
          return prev.map((item) => {
            if (!item.name && !done) {
              done = true
              return {
                ...hoverCard.cardData,
              }
            }
            return item
          })
        })
      }

      setHoverCard(null)
    }
  }
})