import { useMemo, useState } from "react"
import traitJSON_set13 from "../assets/tft-trait-set13.json"
import traitJSON_set14 from "../assets/tft-trait-set14.json"
import traitJSON_set17 from "../assets/tft-trait-set17.json"
import { useShopStore } from "../store/shopStore"
import { useSiteStore } from "../store/siteStore"
import { SeasonKey, TraitData } from "../types/shopStoreTypes"

const traitJSON = {
  set13: traitJSON_set13,
  set14: traitJSON_set14,
  set17: traitJSON_set17,
}

type TraitEffect = NonNullable<TraitData["data"][string]["effects"]>[number]

interface TraitRow {
  id: string
  name: string
  image: string
  count: number
  effects: TraitEffect[]
  activeEffect: TraitEffect | null
  nextEffect: TraitEffect | null
}

const activeStyles: Record<string, string> = {
  1: "border-amber-700 bg-amber-950/75 text-amber-100",
  2: "border-slate-300 bg-slate-700/80 text-white",
  3: "border-yellow-400 bg-yellow-900/70 text-yellow-50",
  4: "border-cyan-300 bg-cyan-900/70 text-cyan-50",
  5: "border-purple-300 bg-purple-900/70 text-purple-50",
}

const inactiveStyle = "border-reroll-border bg-bg-black/85 text-text-white"
const traitsPerPage = 8

const getTraitRows = (
  season: SeasonKey,
  space: ReturnType<typeof useSiteStore.getState>["space"]
): TraitRow[] => {
  const traitData = traitJSON[season].data as TraitData["data"]
  const countedChampions = new Set<string>()
  const traitCounts = new Map<string, number>()

  space.forEach((champion) => {
    if (!champion || countedChampions.has(champion.id)) return

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

const TraitPanel = () => {
  const [page, setPage] = useState(0)
  const { season } = useShopStore()
  const { space } = useSiteStore()
  const currentSeason = season as SeasonKey
  const rows = useMemo(() => getTraitRows(currentSeason, space), [currentSeason, space])
  const totalPages = Math.max(1, Math.ceil(rows.length / traitsPerPage))
  const currentPage = Math.min(page, totalPages - 1)
  const visibleRows = rows.slice(
    currentPage * traitsPerPage,
    currentPage * traitsPerPage + traitsPerPage
  )

  return (
    <section className="flex flex-col w-full lg:w-58 h-80 xl:h-100 px-4 py-3 lg:mx-2 text-text-white bg-reroll-bg border-2 border-reroll-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold">羈絆</h3>
        <div className="flex items-center gap-2">
          <p className="text-sm text-text-white/75">{rows.filter((row) => row.activeEffect).length}/{rows.length}</p>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                className="flex items-center justify-center w-6 h-6 border border-reroll-border bg-bg-black text-text-white disabled:opacity-35 hover:cursor-pointer disabled:hover:cursor-default"
                disabled={currentPage === 0}
                onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                title="上一頁"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <p className="w-8 text-center text-xs text-text-white/75 tabular-nums">{currentPage + 1}/{totalPages}</p>
              <button
                className="flex items-center justify-center w-6 h-6 border border-reroll-border bg-bg-black text-text-white disabled:opacity-35 hover:cursor-pointer disabled:hover:cursor-default"
                disabled={currentPage >= totalPages - 1}
                onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
                title="下一頁"
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-text-white/70">尚未放置英雄</p>
      ) : (
        <div className="flex flex-col gap-2 overflow-hidden">
          {visibleRows.map((row) => {
            const target = row.nextEffect?.minUnits ?? row.activeEffect?.minUnits ?? row.count
            const style = row.activeEffect
              ? activeStyles[String(row.activeEffect.style)] ?? activeStyles["3"]
              : inactiveStyle

            return (
              <div
                className={`flex items-center gap-2 min-h-11 px-2 py-1.5 border ${style}`}
                key={row.id}
              >
                <div className="flex items-center justify-center shrink-0 w-8 h-8 bg-trait-icon-bg [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                  <img
                    className="w-5 h-5"
                    src={`img/trait/${currentSeason}/${row.image}`}
                    alt=""
                  />
                </div>
                <div className="min-w-0 grow">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold truncate">{row.name}</p>
                    <p className="shrink-0 text-sm tabular-nums">{row.count}/{target}</p>
                  </div>
                  {row.effects.length > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      {row.effects.map((effect) => (
                        <span
                          className={`h-1.5 rounded-full ${
                            row.count >= effect.minUnits ? "w-5 bg-current" : "w-3 bg-text-white/30"
                          }`}
                          key={effect.minUnits}
                          title={`${effect.minUnits}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default TraitPanel
