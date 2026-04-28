import { useEffect } from "react"
import { getShepherdSummon } from "../data/traitSummons"
import { useShopStore } from "../store/shopStore"
import { useSiteStore } from "../store/siteStore"
import { getBaseBoard, getUniqueTraitCount } from "../utils/boardUnits"

const summonPreferredSlots = [0, 6, 3, 1, 5, 2, 4, 8, 12, 10]

const TraitSummonSync = () => {
  const { season } = useShopStore()
  const { space, setSpace } = useSiteStore()

  useEffect(() => {
    const shepherdCount =
      season === "set17" ? getUniqueTraitCount(space, "SummonTrait") : 0
    const desiredSummon = season === "set17" ? getShepherdSummon(shepherdCount) : null

    const nextSpace = getBaseBoard(space)
    const currentSummonIndex = space.findIndex((unit) => unit?.isSummon)
    const currentSummon = currentSummonIndex >= 0 ? space[currentSummonIndex] : null

    if (desiredSummon) {
      if (currentSummon && nextSpace[currentSummonIndex] === null) {
        nextSpace[currentSummonIndex] = {
          ...desiredSummon,
        }
      } else {
        const summonSlot = summonPreferredSlots.find((index) => nextSpace[index] === null)
        if (summonSlot !== undefined) {
          nextSpace[summonSlot] = { ...desiredSummon }
        }
      }
    }

    const hasChanged = nextSpace.some((unit, index) => {
      const current = space[index]
      return (
        current?.id !== unit?.id ||
        current?.summonBreakpoint !== unit?.summonBreakpoint ||
        Boolean(current?.isSummon) !== Boolean(unit?.isSummon)
      )
    })

    if (hasChanged) {
      setSpace(nextSpace)
    }
  }, [season, setSpace, space])

  return null
}

export default TraitSummonSync
