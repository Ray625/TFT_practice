import { useEffect } from "react"
import champion_set13 from "../assets/tft-champion-set13.json"
import champion_set14 from "../assets/tft-champion-set14.json"
import traitJSON_set13 from "../assets/tft-trait-set13.json"
import traitJSON_set14 from "../assets/tft-trait-set14.json"
import shopRates from "../assets/tft-shop-drop-rates-data.json"
import useThrottle from "../hooks/useThrottle"
import { useShopStore } from "../store/shopStore"
import { useSiteStore } from "../store/siteStore"
import { TraitData, SeasonKey } from "../types/shopStoreTypes"

const champion = {
  set13: champion_set13,
  set14: champion_set14
}

const traitJSON = {
  set13: traitJSON_set13,
  set14: traitJSON_set14
}

const Shop = () => {
  const {
    level,
    xp,
    total,
    season,
    shopList,
    drawCard,
    buyXp,
    setLevel,
    setTotal,
    buyCard,
    sellCard,
    placeCard,
  } = useShopStore()
  const { playerSide, hoverCard, } = useSiteStore()
  const xpList = [2, 2, 6, 10, 20, 36, 48, 76, 84, 0]
  const levelNeededXp = xpList[level - 1]
  const levelRate = shopRates.data.Shop[`${level - 1}`].dropRatesByTier

  const throttleDrawCard = useThrottle(drawCard, 250)
  const throttleBuyXp = useThrottle(buyXp, 100)

  // 設立監聽器，當使用者按下F時購買經驗，D刷新商店，E販賣hover卡牌
  useEffect(() => {
    const handlePressKey = (event: any) => {
      if (event.keyCode === 70) {
        throttleBuyXp()
      }

      if (event.keyCode === 68) {
        throttleDrawCard()
      }

      if (event.keyCode === 69 && hoverCard) {
        sellCard(hoverCard)
      }

      if (event.keyCode === 87 && hoverCard) {
        placeCard(hoverCard)
      }
    }

    window.addEventListener("keydown", handlePressKey)

    return () => {
      window.removeEventListener("keydown", handlePressKey)
    }
  }, [hoverCard, throttleBuyXp, throttleDrawCard, sellCard, placeCard])

  // 預載英雄、特性圖片
  useEffect(() => {
    const championImages = []
    const traitImages = []

    for (let item of Object.values(champion[season as SeasonKey].data)) {
      championImages.push(item.id)
    }
    for (let item of Object.values(traitJSON[season as SeasonKey].data)) {
      traitImages.push(item.image.full)
    }

    championImages.forEach((img) => {
      const imgObj = new Image()
      imgObj.src = `img/champion/${season}/${img}.TFT_Set13.png`
    })

    championImages.forEach((img) => {
      const faceObj = new Image()
      faceObj.src = `img/face/${season}/${img}.avif`
    })

    traitImages.forEach((img) => {
      const imgObj = new Image()
      imgObj.src = `img/trait/${season}/${img}`
    })
  },[])

  return (
    <>
      <div className="relative flex flex-col w-360 mx-auto font-sans">
        <div className="relative z-10 flex items-end w-full aspect-[209/8]">
          <div className="relative top-1 z-10 h-full p-1 aspect-[75/16] bg-border-gold [clip-path:polygon(0%_0%,85%_0%,100%_100%,0%_100%)]">
            <div className="w-full p-1 aspect-[75/16] bg-bg-black [clip-path:polygon(0%_0%,85%_0%,100%_100%,0%_100%)]">
              <div className="flex flex-row items-end w-full">
                <h5 className="text-2xl/7 pl-1 text-text-white text-left">
                  {`等級 ${level}`}
                </h5>
                <div className="flex flex-row gap-1 items-center h-7 ml-2">
                  <button
                    className="w-4 h-4 m-0 p-0 border border-white rounded-full bg-bg-black text-white hover:cursor-pointer hover:opacity-80"
                    onClick={() => {
                      if (level >= 10) return
                      setLevel(prev => prev + 1)
                    }}
                    title="Level up"
                  >
                    <div className="flex justify-center items-center text-sm select-none">
                      <i className="fa-solid fa-plus fa-sm"></i>
                    </div>
                  </button>
                  <button
                    className="w-4 h-4 m-0 p-0 border border-white rounded-full bg-bg-black text-white hover:cursor-pointer hover:opacity-80"
                    onClick={() => {
                      if (level <= 1) return
                      setLevel((prev) => prev - 1)
                    }}
                    title="Level down"
                  >
                    <div className="flex justify-center items-center text-sm select-none">
                      <i className="fa-solid fa-minus fa-sm"></i>
                    </div>
                  </button>
                </div>
                <p className="text-l ml-[20%] text-text-white">{`${xp}/${levelNeededXp}`}</p>
              </div>
            </div>
          </div>
          <div className="relative -left-[2.2%] h-4/6 aspect-[54/6] bg-bg-black/80 [clip-path:polygon(0%_0%,92.5%_0%,100%_100%,6.5%_100%)]">
            <div className="flex flex-row items-center justify-between w-4/5 h-full mx-auto opacity-90">
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 bg-one-cost rounded-full"></div>
                <p className="text-one-cost font-extralight">{`${levelRate[0].rate}%`}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 bg-two-cost rounded-full"></div>
                <p className="text-two-cost font-extralight">{`${levelRate[1].rate}%`}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 bg-three-cost [clip-path:polygon(50%_0%,100%_100%,0%_100%)]"></div>
                <p className="text-three-cost font-extralight">{`${levelRate[2].rate}%`}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-1.5 h-1.5 bg-four-cost rotate-45"></div>
                <p className="text-four-cost font-extralight">{`${levelRate[3].rate}%`}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 bg-five-cost [clip-path:polygon(50%_0%,100%_39.5%,80.5%_100%,19.5%_100%,0%_39.5%)]"></div>
                <p className="text-five-cost font-extralight">{`${levelRate[4].rate}%`}</p>
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 h-full p-1 aspect-[15/4] bg-border-gold [clip-path:polygon(20%_0%,80%_0%,100%_100%,0%_100%)]">
            <div className="w-full aspect-[15/4] p-1.5 bg-gold-bg [clip-path:polygon(20%_0%,80%_0%,100%_100%,0%_100%)]">
              <h5 className="flex items-center justify-center gap-2 text-2xl/7 text-text-white text-center">
                <img className="w-5 h-5" src="img/item/Gold.png" alt="icon" />
                <input
                  name="gold"
                  type="num"
                  value={total}
                  className="w-12 h-fit m-0 flex items-center justify-center pt-1 text-2xl/7 text-text-white text-center"
                  min={0}
                  max={999}
                  title="Enter money"
                  onChange={(event) => {
                    const value = event.target.value
                    if (value.length === 0) return setTotal("")

                    const numeric = Number(value)
                    if (isNaN(numeric)) {
                      alert("請輸入數字")
                      return
                    }
                    if (numeric > 999) return setTotal("999")
                    if (numeric <= 0) return setTotal("0")

                    setTotal(value)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.currentTarget.blur()
                    }
                  }}
                  onBlur={() => {
                    if (typeof total === "string" && total.length === 0) setTotal("0")
                  }}
                />
                <div className="mt-0.5">
                  <button
                    className="flex justify-center items-center w-5 h-5 m-0 p-0 bg-bg-black rounded-full border border-white hover:opacity-80 hover:cursor-pointer select-none"
                    title="+10 Gold"
                    onClick={() => {
                      setTotal((prev) => {
                        const num = Number(prev || "0");
                        const added = Math.min(num + 10, 999) // 最大不超過 999
                        return added
                      })
                    }}
                  >
                    <div className="flex justify-center items-center text-sm mt-0.5 select-none">
                      <i className="fa-solid fa-plus fa-sm"></i>
                    </div>
                  </button>
                </div>
              </h5>
            </div>
          </div>
        </div>
        <div className="relative z-0 grid grid-cols-6 gap-2 w-full p-2 aspect-[104/14] bg-bg-black border-4 border-border-gold shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]">
          <div className="flex flex-col gap-2 h-full bg-bg-black">
            <button
              className="relative h-full flex flex-col bg-xp-bg border-2 border-xp-border active:opacity-90 hover:opacity-80 hover:cursor-pointer transition-opacity duration-150"
              onClick={throttleBuyXp}
              title="購買經驗(F)"
            >
              <h6 className="text-xl m-0 pt-1 pl-2 text-text-white text-left">
                購買XP
              </h6>
              <p className="flex items-center justify-start pl-2 text-xl  text-text-white">
                <img
                  className="w-4 h-4 mr-2 mt-1"
                  src="img/item/Gold.png"
                  alt="icon"
                />
                4
              </p>
              <div className="absolute right-0 top-0 w-full h-full bg-xp-icon [clip-path:polygon(42%_0%,100%_0%,100%_100%,73%_100%)]">
                <img
                  className="absolute right-3 top-3 w-12 h-12"
                  src="img/svg/xp.svg"
                  alt="icon"
                />
              </div>
            </button>
            <button
              className="relative h-full flex flex-col bg-reroll-bg border-2 border-reroll-border active:opacity-90 hover:opacity-80 hover:cursor-pointer transition-opacity duration-150"
              title="刷新商店(D)"
              onClick={throttleDrawCard}
            >
              <h6 className="text-xl m-0 pt-1 pl-2 text-text-white text-left">
                刷新
              </h6>
              <p className="flex items-center justify-start pl-2 text-xl  text-text-white">
                <img
                  className="w-4 h-4 mr-2 mt-1"
                  src="img/item/Gold.png"
                  alt="icon"
                />
                2
              </p>
              <div className="absolute right-0 top-0 w-full h-full bg-reroll-icon [clip-path:polygon(42%_0%,100%_0%,100%_100%,73%_100%)]">
                <img
                  className="absolute right-3 top-3 w-12 h-12"
                  src="img/svg/reroll.svg"
                  alt="icon"
                />
              </div>
            </button>
          </div>
          {shopList.map((item, index) => {
            // 卡被抽出後，留下空位
            if (!item) {
              return (
                <div
                  className="flex flex-col justify-center items-center h-full p-1 bg-empty-card-wrapper border "
                  key={index}
                >
                  <div className="w-9/10 h-9/10 border-2 border-empty-card-border bg-empty-card-bg"></div>
                </div>
              )
            }

            const canIncreaseStars =
              (item.id && playerSide[item.id]?.owned === 2) ||
              (item.id && playerSide[item.id]?.owned === 5)
            const canIncreaseThreeStars = (item.id && playerSide[item.id]?.owned) === 8

            // 不同費用外框不同顏色
            const cost = (item.tier && ["one", "two", "three", "four", "five"][item.tier - 1])

            const borderColors: Record<string,string> = {
              one: "border-one-cost-card-light",
              two: "border-two-cost-card-light",
              three: "border-three-cost-card-light",
              four: "border-four-cost-card-light",
              five: "border-five-cost-card-light",
            }

            const cardFooterColorFrom: Record<string,string> = {
              one: "from-one-cost-card-dark",
              two: "from-two-cost-card-dark",
              three: "from-three-cost-card-dark",
              four: "from-four-cost-card-dark",
              five: "from-five-cost-card-dark",
            }

            const cardFooterColorTo: Record<string,string> = {
              one: "to-one-cost-card-light",
              two: "to-two-cost-card-light",
              three: "to-three-cost-card-light",
              four: "to-four-cost-card-light",
              five: "to-five-cost-card-light",
            }

            const body = (
              <>
                <div
                  className={`relative border-2 ${borderColors[cost]}`}
                  onClick={() => {
                    buyCard(item, index)
                  }}
                >
                  {/* 可升星時出現提示 */}
                  {canIncreaseStars && (
                    <div className="absolute top-0 left-2 flex flex-row gap-0.5 -translate-y-2/5 animate-flash">
                      {[1, 2].map((item) => {
                        return (
                          <img
                            src="img/svg/twoStar.svg"
                            alt="starIcon"
                            className="drop-shadow-black"
                            key={item}
                          />
                        )
                      })}
                    </div>
                  )}
                  {canIncreaseThreeStars && (
                    <div className="absolute top-0 left-2 flex flex-col items-center -translate-y-1/5 animate-flash">
                      <img
                        src="img/svg/threeStar.svg"
                        alt="starIcon"
                        className="drop-shadow-black"
                      />
                      <div className="flex flex-row items-center">
                        {[1, 2].map((item) => {
                          return (
                            <img
                              src="img/svg/threeStar.svg"
                              alt="starIcon"
                              className="drop-shadow-black"
                              key={item}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )}
                  <div className="border border-card-border">
                    <img
                      className="w-full aspect-[69/40]"
                      src={`img/champion/${season}/${item.image.full}`}
                      alt="champion"
                    />
                  </div>
                  <div className="absolute top-0 left-0 flex flex-col justify-end pl-1 w-full h-full">
                    {item.trait?.map((traitName) => {
                      const traitData: TraitData["data"] = traitJSON[season as SeasonKey].data
                      const trait = traitData[`TFT${season.slice(-2)}_${traitName}`]
                      return (
                        <div className="flex flex-row" key={trait.id}>
                          <div className="w-fit h-fit p-[1px] mr-1 bg-trait-icon-shadow [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                            <div className="flex justify-center items-center w-5 h-6 bg-trait-icon-bg [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                              <img
                                src={`img/trait/${season}/${trait.image.full}`}
                                alt="icon"
                                className="w-3 h-3"
                              />
                            </div>
                          </div>
                          <p className="text-lg text-text-white text-left">
                            {trait.name}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div
                  className={`flex flex-row justify-between items-center px-2 bg-linear-to-r ${cardFooterColorFrom[cost]} ${cardFooterColorTo[cost]} grow`}
                >
                  <p className="text-xl text-text-white">{item.name}</p>
                  <p className="flex items-end justify-start text-lg text-text-white font-light font-sans leading-none ">
                    <img
                      className="w-4 h-4 mr-2 mt-1"
                      src="img/item/Gold.png"
                      alt="icon"
                    />
                    {item.tier}
                  </p>
                </div>
              </>
            )

            return (
              <div
                className={`flex flex-col h-full p-0.5 border bg-empty-card-wrapper hover:opacity-90 hover:cursor-pointer transition-opacity duration-150`}
                key={index}
              >
                <div
                  className={`relative z-1 p-0.5 ${
                    !canIncreaseStars && "bg-empty-card-wrapper"
                  }`}
                >
                  {canIncreaseStars && (
                    <>
                      <div className="absolute top-0 right-0 left-0 bottom-0 -z-10 overflow-hidden">
                        <img src="img/svg/levelUp.svg" alt="levelUpAnimation" />
                      </div>
                    </>
                  )}
                  {canIncreaseThreeStars && (
                    <>
                      <div className="absolute top-0 right-0 left-0 bottom-0 -z-10 overflow-hidden">
                        <img
                          src="img/svg/levelUpThreeStar.svg"
                          alt="levelUpAnimation"
                        />
                      </div>
                    </>
                  )}
                  {body}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Shop
