import traitJSON_set13 from "../assets/tft-trait-set13.json"
import traitJSON_set14 from "../assets/tft-trait-set14.json"
import traitJSON_set17 from "../assets/tft-trait-set17.json"
import { TraitData, SeasonKey, ChampionData } from "../types/shopStoreTypes"
import { isSummonUnit } from "./boardUnits"

const traitJSON = {
  set13: traitJSON_set13,
  set14: traitJSON_set14,
  set17: traitJSON_set17,
}

export type TraitEffect = NonNullable<TraitData["data"][string]["effects"]>[number]

export interface TraitRow {
  id: string
  name: string
  image: string
  count: number
  effects: TraitEffect[]
  activeEffect: TraitEffect | null
  nextEffect: TraitEffect | null
}

export const activeTraitRowStyles: Record<string, string> = {
  1: "border-amber-700 bg-amber-950/75 text-amber-100",
  2: "border-slate-300 bg-slate-700/80 text-white",
  3: "border-yellow-400 bg-yellow-900/70 text-yellow-50",
  4: "border-cyan-300 bg-cyan-900/70 text-cyan-50",
  5: "border-purple-300 bg-purple-900/70 text-purple-50",
}

export const boardTraitIconPalette = {
  active: { fill: "#A8794D", border: "#D2B089" },
  inactive: { fill: "#1B1D20", border: "#53575E" },
}

const getTraitData = (season: SeasonKey) => traitJSON[season].data as TraitData["data"]

export const getTraitRows = (
  season: SeasonKey,
  space: (ChampionData | null)[],
): TraitRow[] => {
  const traitData = getTraitData(season)
  const countedChampions = new Set<string>()
  const traitCounts = new Map<string, number>()

  space.forEach((champion) => {
    if (!champion || isSummonUnit(champion) || countedChampions.has(champion.id)) return

    countedChampions.add(champion.id)
    champion.trait.forEach((traitName) => {
      const traitId = `TFT${season.slice(-2)}_${traitName}`
      traitCounts.set(traitId, (traitCounts.get(traitId) ?? 0) + 1)
    })
  })

  return Array.from(traitCounts.entries())
    .flatMap(([traitId, count]) => {
      const trait = traitData[traitId]
      if (!trait) return []

      const effects = [...(trait.effects ?? [])].sort((a, b) => a.minUnits - b.minUnits)
      const activeEffect = effects.filter((effect) => count >= effect.minUnits).at(-1) ?? null
      const nextEffect = effects.find((effect) => count < effect.minUnits) ?? null

      return [{
        id: trait.id,
        name: trait.name,
        image: trait.image.full,
        count,
        effects,
        activeEffect,
        nextEffect,
      }]
    })
    .sort((a, b) => {
      if (Boolean(a.activeEffect) !== Boolean(b.activeEffect)) return a.activeEffect ? -1 : 1
      return b.count - a.count || a.name.localeCompare(b.name, "zh-Hant")
    })
}

export const getActiveTraitStyleMap = (
  season: SeasonKey,
  space: (ChampionData | null)[],
) => {
  const activeStyleMap = new Map<string, number>()

  getTraitRows(season, space).forEach((row) => {
    if (row.activeEffect) {
      activeStyleMap.set(row.id, row.activeEffect.style)
    }
  })

  return activeStyleMap
}
