import gsap from "gsap"
import { useLayoutEffect, useRef } from "react"

interface LevelUpHintProps {
  star: 2 | 3
}

const LevelUpHint = ({ star }: LevelUpHintProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const starRefs = useRef<HTMLImageElement[]>([])
  const starIcon = star === 3 ? "img/svg/threeStar.svg" : "img/svg/twoStar.svg"

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "sine.inOut" },
        repeat: -1,
        yoyo: true,
      })

      timeline.fromTo(
        starRefs.current,
        { opacity: 0.55, scale: 0.9, y: 0 },
        {
          opacity: 1,
          scale: 1.05,
          duration: 0.75,
        }
      )

      // TODO: On card hover, use timeline.timeScale(1.6) to make the hint more urgent.
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className={`absolute top-0 left-2 z-10 pointer-events-none select-none ${
        star === 3
          ? "flex -translate-y-1/5 flex-col items-center"
          : "flex -translate-y-2/5 flex-row gap-0.5"
      }`}
      aria-hidden="true"
    >
      {star === 3 ? (
        <>
          <img
            ref={(element) => {
              if (element) starRefs.current[0] = element
            }}
            src={starIcon}
            alt=""
            className="drop-shadow-black"
          />
          <div className="flex flex-row items-center">
            {[1, 2].map((item) => (
              <img
                ref={(element) => {
                  if (element) starRefs.current[item] = element
                }}
                src={starIcon}
                alt=""
                className="drop-shadow-black"
                key={item}
              />
            ))}
          </div>
        </>
      ) : (
        [0, 1].map((item) => (
          <img
            ref={(element) => {
              if (element) starRefs.current[item] = element
            }}
            src={starIcon}
            alt=""
            className="drop-shadow-black"
            key={item}
          />
        ))
      )}
    </div>
  )
}

export default LevelUpHint
