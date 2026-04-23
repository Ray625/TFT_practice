import gsap from "gsap"
import { useLayoutEffect, useRef } from "react"

interface LevelUpBorderProps {
  star: 2 | 3
}

const LevelUpBorder = ({ star }: LevelUpBorderProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const pathRef = useRef<SVGPathElement | null>(null)
  const strokeColor = star === 3 ? "#FDFF00" : "#FFFFFF"
  const filterId = `level-up-border-glow-${star}`
  const dashLength = 184
  const gapLength = 200
  const dashCycle = dashLength + gapLength

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline()

      timeline.fromTo(
        pathRef.current,
        { strokeDashoffset: 0 },
        {
          strokeDashoffset: -dashCycle,
          duration: 3,
          ease: "none",
          repeat: -1,
        }
      )
      timeline.to(
        pathRef.current,
        {
          keyframes: [
            { strokeOpacity: 0.35, duration: 1.2 },
            { strokeOpacity: 0.95, duration: 1.2 },
          ],
          ease: "none",
          repeat: -1,
        },
        0
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 225 163"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id={filterId}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          ref={pathRef}
          d="M1 1 H 224 V 162 H 1 Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="4"
          strokeDasharray={`${dashLength} ${gapLength}`}
          strokeOpacity="0.8"
          filter={`url(#${filterId})`}
        />
      </svg>
    </div>
  )
}

export default LevelUpBorder
