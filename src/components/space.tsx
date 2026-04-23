import traitJSON_set13 from "../assets/tft-trait-set13.json"
import traitJSON_set14 from "../assets/tft-trait-set14.json"
import traitJSON_set17 from "../assets/tft-trait-set17.json"
import { useSiteStore } from "../store/siteStore"
import { useShopStore } from "../store/shopStore"
import { BoardUnit } from "../store/siteStore"
import { TraitData, SeasonKey } from "../types/shopStoreTypes"
import StarLevelUpEffect from "./starLevelUpEffect"

interface OneGrid {
  cardData: BoardUnit
  hideStars?: boolean
}

const traitJSON = {
  set13: traitJSON_set13,
  set14: traitJSON_set14,
  set17: traitJSON_set17
}

const OneGrid: React.FC<OneGrid> = ({ cardData, hideStars = false }) => {
  const { season } = useShopStore()

  const cost = cardData?.tier
    ? ["one", "two", "three", "four", "five"][cardData.tier - 1]
    : undefined

  return (
    <div className="relative flex justify-center w-16 xl:w-19.5 aspect-13/15 hover:opacity-80">
      <svg
        version="1.1"
        baseProfile="full"
        xmlns="http://www.w3.org/2000/svg"
        width="78"
        height="90"
        viewBox="0 0 88 100"
      >
        <defs>
          <clipPath id="hexClip">
            <path d="M44 0 L 88 25 L 88 75 L44 100 L 0 75 L 0 25 Z" />
          </clipPath>
        </defs>
        {!cardData && (
          <path
            d="M44 0 L 88 25 L 88 75 L44 100 L 0 75 L 0 25 Z"
            style={{ fill: `var(--color-bg-black)` }}
          />
        )}
        {cardData && cardData.name && (
          <>
            <g clipPath="url(#hexClip)">
              <image
                x="0"
                y="0"
                width="88"
                height="100"
                preserveAspectRatio="xMidYMid slice"
                href={`img/face/${season}/${cardData.faceImage?.full ?? `${cardData.id}.avif`}`}
              />
            </g>
            <path
              d="M44 2 L86 26 L86 74 L44 98 L2 74 L2 26 Z"
              strokeWidth="4px"
              fill="none"
              style={{ stroke: `var(--color-${cost}-cost-card-light)` }}
            />
          </>
        )}
      </svg>
      {cardData && cardData.name && (
        <>
          <div className="absolute z-10 flex flex-row gap-0.5 top-0 left-0 justify-center w-full pt-1.5">
            {cardData.trait && cardData.trait.map((traitName) => {
              const traitData: TraitData["data"] = traitJSON[season as SeasonKey].data
              const trait = traitData[`TFT${season.slice(-2)}_${traitName}`]
              return (
                <svg
                  version="1.1"
                  baseProfile="full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 88 100"
                  width="15.6"
                  height="18"
                  key={traitName}
                >
                  <rect
                    width="88"
                    height="100"
                    style={{ fill: "var(--color-trait-bg)" }}
                    clipPath="url(#hexClip)"
                  />
                  <image
                    x="8.8"
                    y="10"
                    width="70.4"
                    height="80"
                    preserveAspectRatio="xMidYMid slice"
                    href={`img/trait/${season}/${trait.image.full}`}
                    clipPath="url(#hexClip)"
                  />
                  <path
                    d="M44 4 L84 27 L84 73 L44 96 L4 73 L4 27 Z"
                    strokeWidth="4px"
                    fill="none"
                    style={{ stroke: "var(--color-trait-border)" }}
                  />
                </svg>
              )
            })}
          </div>

          {cardData.star === 2 && !hideStars && (
            <>
              <div className="absolute top-0 left-0 right-0 flex flex-row justify-center gap-0.5 pt-7 pointer-events-none scale-75">
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
            </>
          )}
          {cardData.star === 3 && !hideStars && (
            <>
              <div className="absolute top-0 left-0 right-0 flex flex-row justify-center gap-0.5 pt-7 pointer-events-none scale-75">
                {[1, 2, 3].map((item) => {
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
            </>
          )}
          <p className="absolute flex justify-center items-end z-10 min-w-full w-fit h-full pb-5 text-white text-sm whitespace-nowrap pointer-events-none text-shadow">
            {cardData.name}
          </p>
        </>
      )}
    </div>
  )
}

const Space = () => {
  const { space, spaceAnimate, setHoverCard, dragStart, drop, dragOver } = useSiteStore()
  const { setIsDragging } = useShopStore()

  return (
    <div className="flex flex-col w-fit h-fit mb-8 p-8 bg-seat-bg">
      {Array.from({ length: 4 }, (_, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex flex-row gap-2 ${
            rowIndex % 2 === 1 ? "ml-9 xl:ml-10.75" : ""
            }`}

        >
          {space
            .slice(rowIndex * 7, rowIndex * 7 + 7)
            .map((item, index) => {
              const boardIndex = rowIndex * 7 + index
              const levelUpStar = spaceAnimate.get(boardIndex)
              const isLevelingUp = levelUpStar === 2 || levelUpStar === 3

              return item ? (
                <div
                  key={boardIndex}
                  onMouseEnter={() =>
                    setHoverCard({
                      place: "space",
                      index: boardIndex,
                      cardData: item,
                    })
                  }
                  onMouseLeave={() => setHoverCard(null)}
                  className="relative"
                  draggable={true}
                  onDragOver={(e) => dragOver(e)}
                  onDrop={(e) => drop(e, boardIndex, "space")}
                  onDragStart={(event) => dragStart(event, item, boardIndex, "space")}
                  onDragEnd={() => setIsDragging(false)}
                >
                  <OneGrid cardData={item} hideStars={isLevelingUp} />
                  {isLevelingUp && (
                    <StarLevelUpEffect star={levelUpStar} shape="hex" placement="space" />
                  )}
                </div>
              ) : (
                  <div
                    key={boardIndex}
                    onDragOver={(e) => dragOver(e)}
                    onDrop={(e) => drop(e, boardIndex, "space")}
                  >
                  <OneGrid cardData={item} />
                </div>
              )
            })}
        </div>
      ))}
    </div>
  )
}

export default Space
