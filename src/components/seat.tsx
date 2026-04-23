import { useSiteStore } from "../store/siteStore"
import { useShopStore } from "../store/shopStore"
import StarLevelUpEffect from "./starLevelUpEffect"

const Seat = () => {
  const { seat, seatAnimate, setHoverCard, dragStart, drop, dragOver } = useSiteStore()
  const { season, setIsDragging } = useShopStore()

  return (
    <div className="flex flex-row items-center justify-center gap-0.5 w-fit h-fit mx-auto mb-4 border-2 border-bg-black bg-bg-black/30">
      {seat.map((item, index) => {
        let cost = ""
        if (item && item.tier) cost = ["one", "two", "three", "four", "five"][item.tier - 1]
        const levelUpStar = seatAnimate.get(index)
        const isLevelingUp = levelUpStar === 2 || levelUpStar === 3

        const borderColors: Record<string, string> = {
          one: "border-one-cost-card-light",
          two: "border-two-cost-card-light",
          three: "border-three-cost-card-light",
          four: "border-four-cost-card-light",
          five: "border-five-cost-card-light",
        }

        return (
          <div
            className="w-25.5 h-25.5 bg-seat-bg p-2 hover:opacity-80"
            key={index}
            onDragOver={(e) => dragOver(e)}
            onDrop={(e) => drop(e, index, "seat")}
          >
            {item && item.name && (
              <div
                className={`relative w-full h-full border-3 ${borderColors[cost]}`}
                onMouseEnter={() =>
                  setHoverCard({
                    place: "seat",
                    index: index,
                    cardData: item,
                  })
                }
                onMouseLeave={() => setHoverCard(null)}
                draggable={true}
                onDragStart={(event) => dragStart(event, item, index, "seat")}
                onDragEnd={() => setIsDragging(false)}
              >
                {item.star === 2 && !isLevelingUp && (
                  <>
                    <div className="absolute top-0 left-0 right-0 flex flex-row justify-center gap-0.5 pt-2 pointer-events-none select-none">
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
                {item.star === 3 && !isLevelingUp && (
                  <>
                    <div className="absolute top-0 left-0 right-0 flex flex-row justify-center gap-0.5 pt-2 pointer-events-none select-none">
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
                {isLevelingUp && (
                  <StarLevelUpEffect star={levelUpStar} />
                )}
                <p className="absolute left-0 bottom-0 w-full pb-1 text-white text-lg whitespace-nowrap overflow-hidden pointer-events-none text-shadow">
                  {item.name}
                </p>
                <img
                  className="hover:cursor-pointer"
                  src={`img/face/${season}/${item.faceImage?.full ?? `${item.id}.avif`}`}
                  alt="champion"
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Seat
