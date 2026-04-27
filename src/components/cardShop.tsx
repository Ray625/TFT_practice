import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import champion_set13 from "../assets/tft-champion-set13.json"
import champion_set14 from "../assets/tft-champion-set14.json"
import champion_set17 from "../assets/tft-champion-set17.json"
import traitJSON_set13 from "../assets/tft-trait-set13.json"
import traitJSON_set14 from "../assets/tft-trait-set14.json"
import traitJSON_set17 from "../assets/tft-trait-set17.json"
import shopRates from "../assets/tft-shop-drop-rates-data.json"
import useThrottle from "../hooks/useThrottle"
import LevelUpBorder from "./levelUpBorder"
import LevelUpHint from "./levelUpHint"
import { useShopStore } from "../store/shopStore"
import { useSiteStore } from "../store/siteStore"
import { TraitData, SeasonKey } from "../types/shopStoreTypes"
import { ChampionData } from "../types/shopStoreTypes"

const champion = {
  set13: champion_set13,
  set14: champion_set14,
  set17: champion_set17
}

const traitJSON = {
  set13: traitJSON_set13,
  set14: traitJSON_set14,
  set17: traitJSON_set17
}

const Shop = () => {
  const {
    level,
    xp,
    total,
    season,
    shopList,
    dragTargetIndex,
    isDragging,
    drawCard,
    buyXp,
    setLevel,
    setTotal,
    buyCard,
    sellCard,
    placeCard,
    setDragTargetIndex,
    dropToSellCard
  } = useShopStore()
  const { playerSide, hoverCard, dragOver } = useSiteStore()
  const xpList = [2, 2, 6, 10, 20, 36, 48, 76, 84, 0]
  const levelNeededXp = xpList[level - 1]
  const levelRate = shopRates.data.Shop[`${level - 1}`].dropRatesByTier
  const xpPerLamp = 4
  const xpLampCount = levelNeededXp > 0 ? Math.ceil(levelNeededXp / xpPerLamp) : 0
  const litXpLampCount = Math.min(xpLampCount, Math.floor(xp / xpPerLamp))
  const [goldInput, setGoldInput] = useState(String(total))

  const parentRef = useRef<HTMLDivElement | null>(null)
  const dragDataRef = useRef<{ data: ChampionData, index: number } | null>(null)
  const startPosition = useRef({ x: 0, y: 0 })
  const lastPosition = useRef({ x: 0, y: 0 })
  const dragOffset = useRef({ x: 0, y: 0 })
  const dragTargetRef = useRef<HTMLDivElement | null>(null)
  const frameIdRef = useRef<number | null>(null)
  const xpButtonRef = useRef<HTMLButtonElement | null>(null)
  const xpGlowRef = useRef<HTMLDivElement | null>(null)
  const rerollButtonRef = useRef<HTMLButtonElement | null>(null)
  const rerollGlowRef = useRef<HTMLDivElement | null>(null)

  const throttleDrawCard = useThrottle(drawCard, 250)
  const throttleBuyXp = useThrottle(buyXp, 100)
  const canBuyXp = Number(total) >= 4
  const canReroll = Number(total) >= 2

  useEffect(() => {
    setGoldInput(String(total))
  }, [total])

  const commitGoldInput = () => {
    const trimmedValue = goldInput.trim()

    if (trimmedValue.length === 0) {
      setTotal("0")
      setGoldInput("0")
      return
    }

    if (!/^\d+$/.test(trimmedValue)) {
      setGoldInput(String(total))
      return
    }

    const normalizedValue = Math.min(999, Math.max(0, Number(trimmedValue)))
    const nextValue = String(normalizedValue)

    setTotal(nextValue)
    setGoldInput(nextValue)
  }

  const playButtonFeedback = ({
    button,
    glow,
  }: {
    button: HTMLButtonElement | null
    glow: HTMLDivElement | null
  }) => {
    if (!button || !glow) return

    gsap.killTweensOf([button, glow])

    const timeline = gsap.timeline({
      defaults: { ease: "power2.out" },
    })

    timeline
      .set(glow, {
        opacity: 0,
        scale: 0.96,
      })
      .to(
        button,
        {
          scale: 0.99,
          y: 0,
          duration: 0.08,
        }
      )
      .to(
        button,
        {
          scale: 1,
          y: 0,
          duration: 0.18,
          ease: "back.out(2.2)",
        }
      )
      .fromTo(
        glow,
        {
          opacity: 0.7,
          scale: 0.98,
        },
        {
          opacity: 0,
          scale: 1.04,
          duration: 0.24,
          ease: "power1.out",
        },
        0
      )
  }

  // 設立監聽器，當使用者按下F時購買經驗，D刷新商店，E販賣hover卡牌
  useEffect(() => {
    const handlePressKey = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyF":
          if (!canBuyXp) return
          playButtonFeedback({
            button: xpButtonRef.current,
            glow: xpGlowRef.current,
          })
          throttleBuyXp()
          break
        case "KeyD":
          if (!canReroll) return
          playButtonFeedback({
            button: rerollButtonRef.current,
            glow: rerollGlowRef.current,
          })
          throttleDrawCard()
          break
        case "KeyG":
          setTotal((prev) => {
            const num = Number(prev || "0")
            const added = Math.min(num + 10, 999)
            return added
          })
          break
        case "KeyE":
          if (hoverCard) sellCard(hoverCard)
          break
        case "KeyW":
          if (hoverCard) placeCard(hoverCard)
          break
      }
    }

    window.addEventListener("keydown", handlePressKey)

    return () => {
      window.removeEventListener("keydown", handlePressKey)
    }
  }, [canBuyXp, canReroll, hoverCard, throttleBuyXp, throttleDrawCard, sellCard, placeCard])

  // 預載英雄、特性圖片
  useEffect(() => {
    const championImages = []
    const traitImages = []

    for (let item of Object.values(champion[season as SeasonKey].data)) {
      championImages.push(item)
    }
    for (let item of Object.values(traitJSON[season as SeasonKey].data)) {
      traitImages.push(item.image.full)
    }

    championImages.forEach((champion) => {
      const imgObj = new Image()
      imgObj.src = `img/champion/${season}/${champion.image.full}`
    })

    championImages.forEach((champion) => {
      const faceObj = new Image()
      faceObj.src = `img/face/${season}/${champion.faceImage?.full ?? `${champion.id}.avif`}`
    })

    traitImages.forEach((img) => {
      const imgObj = new Image()
      imgObj.src = `img/trait/${season}/${img}`
    })
  }, [season])

  // 拖曳動畫
  const dragAnimate = () => {
    if (dragTargetRef.current) {
      dragTargetRef.current.style.transform = `translate(${dragOffset.current.x}px, ${dragOffset.current.y}px)`
    }
    // 重複下一幀
    frameIdRef.current = requestAnimationFrame(dragAnimate)
  }

  const handleMouseDown = (e: React.MouseEvent, data: ChampionData, index: number) => {
    // 將拖曳目標資料存入ref，於放開後購買卡牌
    const dragData = { data, index }
    dragDataRef.current = dragData
    dragTargetRef.current = e.currentTarget as HTMLDivElement

    // 紀錄初始位置，用於製作拖曳動畫
    startPosition.current = { x: e.clientX, y: e.clientY }

    // setState改變拖曳目標z-index，讓目標浮於圖層上
    setDragTargetIndex(index)

    // 開始動畫並記錄於ref用於清除
    frameIdRef.current = requestAnimationFrame(dragAnimate)

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // 紀錄滑鼠位置，用於拖曳製作動畫
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragTargetRef.current) return
    const { clientX, clientY } = e

    lastPosition.current = { x: e.clientX, y: e.clientY }
    dragOffset.current = { x: clientX - startPosition.current.x, y: clientY - startPosition.current.y }
  }

  // 於滑鼠放開時計算是否將卡牌拖曳出商店，判斷是否購買卡牌
  const handleMouseUp = () => {
    if (!parentRef.current) return
    const parentRect = parentRef.current.getBoundingClientRect()

    // 若使用者單擊沒有拖曳，則lastPosition會是(0, 0)，達到單擊購買的效果
    const rightPosition = lastPosition.current
    const isNowOutside =
    rightPosition.x < parentRect.left ||
    rightPosition.x > parentRect.right ||
    rightPosition.y < parentRect.top ||
    rightPosition.y > parentRect.bottom

    if (isNowOutside && dragDataRef.current) {
      const dragData = dragDataRef.current
      const item = dragData.data
      const startIndex = dragData.index

      buyCard(item, startIndex)
    }

    // 重置ref及動畫
    dragDataRef.current = null
    if (dragTargetRef.current !== null) {
      dragTargetRef.current.style.transform = "none"
      dragTargetRef.current = null
    }
    startPosition.current = { x: 0, y: 0 }
    lastPosition.current = { x: 0, y: 0 }
    dragOffset.current = {x: 0, y: 0}
    if (frameIdRef.current) {
      cancelAnimationFrame(frameIdRef.current)
    }
    setDragTargetIndex(null)

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }

  return (
    <>
      <div className="relative flex flex-col w-full px-4 lg:px-0 lg:w-250 xl:w-300 2xl:w-360 mx-auto font-sans select-none">
        <div className="relative z-10 flex items-end w-full aspect-[209/8]">
          <div className="relative top-1 z-10 h-full p-1 aspect-[75/16] bg-border-gold [clip-path:polygon(0%_0%,85%_0%,100%_100%,0%_100%)]">
            <div className="w-full p-1 aspect-[75/16] bg-bg-black [clip-path:polygon(0%_0%,85%_0%,100%_100%,0%_100%)]">
              <div className="flex h-full flex-col justify-between pl-1 pr-3 py-1">
                <div className="flex flex-row items-end w-full">
                  <h5 className="text-xl/7 xl:text-2xl/7 text-text-white text-left">
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
                      <p className="text-center text-sm/3 lg:text-base/3 xl:base/4 select-none">+</p>
                    </button>
                    <button
                      className="w-4 h-4 m-0 p-0 border border-white rounded-full bg-bg-black text-white hover:cursor-pointer hover:opacity-80"
                      onClick={() => {
                        if (level <= 1) return
                        setLevel((prev) => prev - 1)
                      }}
                      title="Level down"
                    >
                      <p className="text-center text-sm/3 lg:text-xl/3 xl:base/4 select-none">-</p>
                    </button>
                  </div>
                  <p className="text-sm ml-2 xl:ml-6 text-text-white">{`${xp}/${levelNeededXp}`}</p>
                </div>
                {xpLampCount > 0 && (
                  <div className="flex w-[78%] max-w-34 items-center gap-0.125 self-start">
                    {Array.from({ length: xpLampCount }, (_, index) => {
                      const isLit = index < litXpLampCount

                      return (
                        <span
                          className={`h-1.5 flex-1 border ${
                            isLit
                              ? "border-cyan-200 bg-cyan-300 shadow-[0_0_6px_rgba(125,211,252,0.65)]"
                              : "border-xp-border/70 bg-xp-icon/55"
                          }`}
                          key={index}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="relative -left-[2.2%] h-4/6 aspect-[54/6] bg-bg-black/80 [clip-path:polygon(0%_0%,92.5%_0%,100%_100%,6.5%_100%)]">
            <div className="flex flex-row items-center justify-between w-4/5 h-full mx-auto opacity-90 text-sm xl:text-base">
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
              <h5 className="flex items-center justify-center gap-1 xl:gap-2 text-base xl:text-2xl/7 text-text-white text-center">
                <img className="w-5 h-5" src="img/item/Gold.png" alt="icon" />
                <input
                  name="gold"
                  type="text"
                  inputMode="numeric"
                  value={goldInput}
                  className="w-8 xl:w-12 h-fit m-0 flex items-center justify-center pt-1 text-text-white text-center"
                  title="Enter money"
                  onChange={(event) => {
                    setGoldInput(event.target.value)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      commitGoldInput()
                      event.currentTarget.blur()
                    }
                  }}
                  onBlur={commitGoldInput}
                />
                <div className="mt-0.5">
                  <button
                    className="flex justify-center items-center w-5 h-5 m-0 p-0 bg-bg-black rounded-full border border-white hover:opacity-80 hover:cursor-pointer select-none"
                    title="+10 Gold (G)"
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
        <div
          className="relative grid grid-cols-6 gap-2 w-full p-2 aspect-[104/14] xl:aspect-[300/42] 2xl:aspect-[104/14] bg-bg-black border-4 border-border-gold shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]"
          ref={parentRef}
          onDragOver={(e) => dragOver(e)}
          onDrop={() => dropToSellCard(hoverCard)}
        >
          <div className="flex flex-col gap-2 h-full bg-bg-black">
            <button
              className={`relative h-full flex flex-col bg-xp-bg border-2 border-xp-border hover:cursor-pointer transition-opacity duratio ${Number(total) < 4 ? "opacity-60" : "active:opacity-90 hover:opacity-80"}`}
              onClick={() => {
                if (!canBuyXp) return
                playButtonFeedback({
                  button: xpButtonRef.current,
                  glow: xpGlowRef.current,
                })
                throttleBuyXp()
              }}
              title={`${Number(total) < 4 ? "購買經驗(F) (金錢不足)" :"購買經驗(F)"}`}
              ref={xpButtonRef}
            >
              <div
                ref={xpGlowRef}
                className="absolute -inset-1 rounded-[2px] border border-cyan-200/70 opacity-0 pointer-events-none"
                style={{
                  boxShadow: "0 0 12px rgba(125, 211, 252, 0.55), inset 0 0 8px rgba(125, 211, 252, 0.35)",
                }}
                aria-hidden="true"
              />
              <h6 className="text-lg xl:text-xl m-0 pt-1 pl-2 text-text-white text-left">
                購買XP
              </h6>
              <p className="flex items-center justify-start pl-2 text-lg xl:text-xl text-text-white">
                <img
                  className="w-4 h-4 mr-2 mt-1"
                  src="img/item/Gold.png"
                  alt="icon"
                />
                4
              </p>
              <div className="absolute right-0 top-0 w-full h-full bg-xp-icon [clip-path:polygon(48%_0%,100%_0%,100%_100%,73%_100%)] xl:[clip-path:polygon(42%_0%,100%_0%,100%_100%,73%_100%)]">
                <img
                  className="absolute right-3 top-3 w-8 xl:w-10 2xl:x-12 h-8 xl:h-10 2xl:h-12"
                  src="img/svg/xp.svg"
                  alt="icon"
                />
              </div>
            </button>
            <button
              className={`relative h-full flex flex-col bg-reroll-bg border-2 border-reroll-border  hover:cursor-pointer transition-opacity duration-150 ${Number(total) < 2 ? "opacity-60" : "active:opacity-90 hover:opacity-80"}`}
              title={`${Number(total) < 2 ? "刷新商店(D) (金錢不足)" :"刷新商店(D)"}`}
              onClick={() => {
                if (!canReroll) return
                playButtonFeedback({
                  button: rerollButtonRef.current,
                  glow: rerollGlowRef.current,
                })
                throttleDrawCard()
              }}
              ref={rerollButtonRef}
            >
              <div
                ref={rerollGlowRef}
                className="absolute -inset-1 rounded-[2px] border border-amber-200/70 opacity-0 pointer-events-none"
                style={{
                  boxShadow: "0 0 12px rgba(253, 186, 116, 0.55), inset 0 0 8px rgba(253, 186, 116, 0.35)",
                }}
                aria-hidden="true"
              />
              <h6 className="text-lg xl:text-xl m-0 pt-1 pl-2 text-text-white text-left">
                刷新
              </h6>
              <p className="flex items-center justify-start pl-2 text-lg xl:text-xl text-text-white">
                <img
                  className="w-4 h-4 mr-2 mt-1"
                  src="img/item/Gold.png"
                  alt="icon"
                />
                2
              </p>
              <div className="absolute right-0 top-0 w-full h-full bg-reroll-icon [clip-path:polygon(48%_0%,100%_0%,100%_100%,73%_100%)] xl:[clip-path:polygon(42%_0%,100%_0%,100%_100%,73%_100%)]">
                <img
                  className="absolute right-3 top-3 w-8 xl:w-10 2xl:x-12 h-8 xl:h-10 2xl:h-12"
                  src="img/svg/reroll.svg"
                  alt="icon"
                />
              </div>
            </button>
          </div>
          {isDragging &&
            <div className="relative col-start-2 col-end-7 flex justify-center items-center w-full h-full text-2xl text-white">{`出售以獲得 ${hoverCard?.cardData?.tier} 金錢`}</div>
          }
          {!isDragging && shopList.map((item, index) => {
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
              <div
                draggable={false}
                onMouseDown={(e) => handleMouseDown(e, item, index)}
              >
                <div
                  className={`relative border-2 ${borderColors[cost]}`}
                >
                  {/* 可升星時出現提示 */}
                  {canIncreaseStars && <LevelUpHint star={2} />}
                  {canIncreaseThreeStars && <LevelUpHint star={3} />}
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
                          <p className="text-base xl:text-base text-text-white text-left">
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
                  <p className="text-xl xl:text-base 2xl:text-lg text-text-white">{item.name}</p>
                  <p className="flex items-end justify-start text-base xl:text-lg text-text-white font-light font-sans leading-none ">
                    <img
                      className="w-4 h-4 mr-2 mt-1"
                      src="img/item/Gold.png"
                      alt="icon"
                    />
                    {item.tier}
                  </p>
                </div>
              </div>
            )

            return (
              <div
                className={`relative ${dragDataRef.current && index === dragTargetIndex ? "z-100" : "z-2"} flex flex-col justify-center h-full p-0.5 border bg-empty-card-wrapper  hover:cursor-pointer transition-opacity duration-150 ${Number(total) < item.tier ? "opacity-80" : "hover:opacity-90 "}`}
                key={index}
              >
                <div
                  className={`relative z-1 p-0.5 ${!canIncreaseStars && "bg-empty-card-wrapper"} select-none`}
                >
                  {canIncreaseStars && <LevelUpBorder star={2} />}
                  {canIncreaseThreeStars && <LevelUpBorder star={3} />}
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
