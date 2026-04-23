import gsap from "gsap"
import { useLayoutEffect, useRef } from "react"

interface StarLevelUpEffectProps {
  star: 2 | 3
  shape?: "hex" | "square"
  placement?: "space" | "seat"
}

const hexClipPath = "polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)"

const StarLevelUpEffect = ({
  star,
  shape = "square",
  placement = "seat",
}: StarLevelUpEffectProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const flashRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const starLayerRef = useRef<HTMLDivElement | null>(null)
  const starRefs = useRef<HTMLImageElement[]>([])
  const sparkRefs = useRef<HTMLSpanElement[]>([])

  const starIcon = star === 3 ? "img/svg/threeStar.svg" : "img/svg/twoStar.svg"
  const glowColor = star === 3 ? "#FFFF3C" : "#FBFBFA"
  const fillColor = star === 3 ? "var(--color-three-star-light)" : "var(--color-two-star-light)"

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const rootHeight = rootRef.current?.offsetHeight ?? 0
      const starLayerHeight = starLayerRef.current?.offsetHeight ?? 0
      const startY = rootHeight / 2 - starLayerHeight / 2
      const endY = placement === "space" ? 28 : 8
      const endScale = placement === "space" ? 0.75 : 1
      const timeline = gsap.timeline({ defaults: { ease: "power2.out" } })

      timeline
        .set(rootRef.current, { opacity: 1 })
        .set(starLayerRef.current, {
          opacity: 1,
          y: startY,
          scale: 1.25,
          transformOrigin: "center top",
        })
        .fromTo(
          flashRef.current,
          { opacity: 0.95, scale: 1.28 },
          { opacity: 0, scale: 1, duration: 0.55, ease: "power3.out" }
        )
        .fromTo(
          ringRef.current,
          { opacity: 0.9, scale: 0.82 },
          { opacity: 0, scale: 1.38, duration: 0.52, ease: "power2.out" },
          "<"
        )
        .fromTo(
          starRefs.current,
          { opacity: 0, y: 12, scale: 0.45, rotate: -16 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.26,
            stagger: 0.04,
            ease: "back.out(2.4)",
          },
          "<0.04"
        )
        .to(
          starLayerRef.current,
          {
            y: endY,
            scale: endScale,
            duration: 0.38,
            ease: "back.out(1.6)",
          },
          ">0.05"
        )
        .fromTo(
          sparkRefs.current,
          { opacity: 0.95, scale: 0.25, x: 0, y: 0 },
          {
            opacity: 0,
            scale: 1,
            x: (index) => Math.cos((index / sparkRefs.current.length) * Math.PI * 2) * 36,
            y: (index) => Math.sin((index / sparkRefs.current.length) * Math.PI * 2) * 30,
            duration: 0.45,
            stagger: 0.015,
            ease: "power2.out",
          },
          "<-0.16"
        )
    }, rootRef)

    return () => ctx.revert()
  }, [placement])

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 z-20 pointer-events-none select-none"
      aria-hidden="true"
    >
      <div
        ref={flashRef}
        className="absolute inset-0"
        style={{
          backgroundColor: fillColor,
          clipPath: shape === "hex" ? hexClipPath : undefined,
          filter: `drop-shadow(0 0 10px ${glowColor})`,
          transformOrigin: "center",
        }}
      />
      <div
        ref={ringRef}
        className="absolute inset-0 border-2"
        style={{
          borderColor: glowColor,
          clipPath: shape === "hex" ? hexClipPath : undefined,
          boxShadow: `0 0 14px ${glowColor}, inset 0 0 12px ${glowColor}`,
          transformOrigin: "center",
        }}
      />
      <div
        ref={starLayerRef}
        className="absolute left-0 right-0 top-0 flex justify-center gap-0.5"
      >
        {Array.from({ length: star }, (_, index) => (
          <img
            ref={(element) => {
              if (element) starRefs.current[index] = element
            }}
            src={starIcon}
            alt=""
            className="drop-shadow-black"
            key={index}
          />
        ))}
      </div>
      {Array.from({ length: 10 }, (_, index) => (
        <span
          ref={(element) => {
            if (element) sparkRefs.current[index] = element
          }}
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundColor: glowColor,
            boxShadow: `0 0 8px ${glowColor}`,
          }}
          key={index}
        />
      ))}
    </div>
  )
}

export default StarLevelUpEffect
