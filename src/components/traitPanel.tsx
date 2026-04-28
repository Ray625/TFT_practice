import { useMemo, useState } from "react"
import traitJSON_set13 from "../assets/tft-trait-set13.json"
import traitJSON_set14 from "../assets/tft-trait-set14.json"
import traitJSON_set17 from "../assets/tft-trait-set17.json"
import { useShopStore } from "../store/shopStore"
import { useSiteStore } from "../store/siteStore"
import { SeasonKey } from "../types/shopStoreTypes"
import { getDeployableUnitCount, isSummonUnit } from "../utils/boardUnits"
import { activeTraitRowStyles, getTraitRows } from "../utils/traits"

const traitJSON = {
  set13: traitJSON_set13,
  set14: traitJSON_set14,
  set17: traitJSON_set17,
}

const inactiveStyle = "border-reroll-border bg-bg-black/85 text-text-white"
const traitsPerPage = 6

const TraitPanel = () => {
  const [page, setPage] = useState(0)
  const { season, level } = useShopStore()
  const { space } = useSiteStore()
  const currentSeason = season as SeasonKey
  const rows = useMemo(() => getTraitRows(currentSeason, space), [currentSeason, space])
  const unitCount = useMemo(
    () => getDeployableUnitCount(space),
    [space],
  )
  const isUnitCapReached = unitCount >= level
  const totalPages = Math.max(1, Math.ceil(rows.length / traitsPerPage))
  const currentPage = Math.min(page, totalPages - 1)
  const visibleRows = rows.slice(
    currentPage * traitsPerPage,
    currentPage * traitsPerPage + traitsPerPage
  )

  return (
    <section className="flex flex-col w-full lg:w-58 h-80 xl:h-100 px-4 py-3 lg:mx-2 text-text-white bg-reroll-bg border-2 border-reroll-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold">羈絆</h3>
          <div
            className={`flex items-center gap-1.5 px-2 py-1 border text-xs tabular-nums transition-colors duration-150 ${
              isUnitCapReached
                ? "border-white bg-white/12 text-white shadow-[0_0_10px_rgba(255,255,255,0.18)]"
                : "border-reroll-border bg-bg-black/80 text-text-white/85"
            }`}
          >
            <span className={isUnitCapReached ? "text-white" : "text-text-white/60"}>人口</span>
            <span>{unitCount}/{level}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
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
        <div className="flex flex-col gap-2 grow overflow-hidden">
          {visibleRows.map((row) => {
            const target = row.nextEffect?.minUnits ?? row.activeEffect?.minUnits ?? row.count
            const style = row.activeEffect
              ? activeTraitRowStyles[String(row.activeEffect.style)] ?? activeTraitRowStyles["3"]
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
