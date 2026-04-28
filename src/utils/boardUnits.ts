import { ChampionData } from "../types/shopStoreTypes"

export const isSummonUnit = (unit: ChampionData | null | undefined) => Boolean(unit?.isSummon)

export const getDeployableUnitCount = (space: (ChampionData | null)[]) =>
  space.reduce((count, unit) => (unit && !isSummonUnit(unit) ? count + 1 : count), 0)

export const getBaseBoard = (space: (ChampionData | null)[]) =>
  space.map((unit) => (isSummonUnit(unit) ? null : unit))

export const getUniqueTraitCount = (
  space: (ChampionData | null)[],
  traitName: string,
) => {
  const countedChampions = new Set<string>()
  let count = 0

  space.forEach((unit) => {
    if (!unit || isSummonUnit(unit) || countedChampions.has(unit.id)) return

    countedChampions.add(unit.id)
    if (unit.trait.includes(traitName)) {
      count += 1
    }
  })

  return count
}
