import { useEffect, useState } from "react"
import { useShopStore } from "../store/shopStore"

const SessionControls = () => {
  const { level, total, resetRun } = useShopStore()
  const [initialLevel, setInitialLevel] = useState(String(level))
  const [initialGold, setInitialGold] = useState(String(total))

  const commitReset = () => {
    const parsedLevel = Number(initialLevel)
    const parsedGold = Number(initialGold)
    const nextLevel = Number.isFinite(parsedLevel) ? parsedLevel : level
    const nextGold = Number.isFinite(parsedGold) ? parsedGold : Number(total)

    resetRun(nextLevel, nextGold)
    setInitialLevel(String(Math.min(10, Math.max(1, nextLevel))))
    setInitialGold(String(Math.min(999, Math.max(0, nextGold))))
  }

  useEffect(() => {
    const handlePressKey = (event: KeyboardEvent) => {
      if (event.code === "KeyR" && event.shiftKey) {
        event.preventDefault()
        commitReset()
      }
    }

    window.addEventListener("keydown", handlePressKey)

    return () => {
      window.removeEventListener("keydown", handlePressKey)
    }
  }, [initialGold, initialLevel])

  return (
    <section className="flex flex-col gap-3 w-full lg:w-58 px-4 py-4 text-text-white bg-reroll-bg border-2 border-reroll-border">
      <h3 className="text-base font-semibold text-left">開局設定</h3>
      <label className="flex flex-col gap-1.5 text-left">
        <span className="text-xs text-text-white/75">初始等級</span>
        <input
          type="text"
          inputMode="numeric"
          value={initialLevel}
          onChange={(event) => setInitialLevel(event.target.value)}
          className="h-9 px-3 border border-reroll-border bg-bg-black text-sm text-text-white transition-colors duration-150 hover:border-border-gold focus:border-border-gold focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-left">
        <span className="text-xs text-text-white/75">初始金額</span>
        <input
          type="text"
          inputMode="numeric"
          value={initialGold}
          onChange={(event) => setInitialGold(event.target.value)}
          className="h-9 px-3 border border-reroll-border bg-bg-black text-sm text-text-white transition-colors duration-150 hover:border-border-gold focus:border-border-gold focus:outline-none"
        />
      </label>
      <button
        type="button"
        onClick={commitReset}
        title="重置版面 (Shift+R)"
        className="flex items-center justify-center h-10 border border-border-gold bg-gold-bg text-sm font-medium text-text-white transition-all duration-150 hover:cursor-pointer hover:brightness-110 hover:border-yellow-300 active:scale-[0.99]"
      >
        重置版面 (Shift+R)
      </button>
    </section>
  )
}

export default SessionControls
