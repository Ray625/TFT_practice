import { useEffect, useState } from "react"
import { useShopStore } from "../store/shopStore"

const SessionControls = () => {
  const { level, total, resetRun, loadRandomTransitionBoard } = useShopStore()
  const [initialLevel, setInitialLevel] = useState(String(level))
  const [initialGold, setInitialGold] = useState(String(total))
  const [timerSetting, setTimerSetting] = useState("30")
  const [remainingSeconds, setRemainingSeconds] = useState(30)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const commitReset = () => {
    const parsedLevel = Number(initialLevel)
    const parsedGold = Number(initialGold)
    const nextLevel = Number.isFinite(parsedLevel) ? parsedLevel : level
    const nextGold = Number.isFinite(parsedGold) ? parsedGold : Number(total)

    resetRun(nextLevel, nextGold)
    setInitialLevel(String(Math.min(10, Math.max(1, nextLevel))))
    setInitialGold(String(Math.min(999, Math.max(0, nextGold))))
  }

  const normalizeTimerSetting = () => {
    const parsed = Number(timerSetting)
    const nextSeconds = Number.isFinite(parsed)
      ? Math.min(999, Math.max(1, Math.floor(parsed)))
      : 30

    setTimerSetting(String(nextSeconds))
    return nextSeconds
  }

  const resetTimer = () => {
    const nextSeconds = normalizeTimerSetting()
    setRemainingSeconds(nextSeconds)
    setIsTimerRunning(false)
  }

  useEffect(() => {
    if (!isTimerRunning) return

    const timerId = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timerId)
          setIsTimerRunning(false)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => {
      window.clearInterval(timerId)
    }
  }, [isTimerRunning])

  const formattedTimer = `${String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:${String(
    remainingSeconds % 60,
  ).padStart(2, "0")}`

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
    <section className="flex flex-col gap-3 w-52 px-3 py-3 text-text-white bg-reroll-bg/95 border-2 border-reroll-border shadow-[0_8px_20px_rgba(0,0,0,0.28)] backdrop-blur-[2px]">
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
      <div className="mt-1 border-t border-reroll-border/80 pt-3">
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-left">回合計時</h3>
          <label className="flex flex-col gap-1.5 text-left">
            <span className="text-xs text-text-white/75">倒數秒數</span>
            <input
              type="text"
              inputMode="numeric"
              value={timerSetting}
              onChange={(event) => setTimerSetting(event.target.value)}
              onBlur={normalizeTimerSetting}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  resetTimer()
                  event.currentTarget.blur()
                }
              }}
              className="h-9 px-3 border border-reroll-border bg-bg-black text-sm text-text-white transition-colors duration-150 hover:border-border-gold focus:border-border-gold focus:outline-none"
            />
          </label>
          <div className="flex items-center justify-center h-12 border border-reroll-border bg-bg-black text-xl font-semibold tracking-[0.08em] tabular-nums">
            {formattedTimer}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                if (remainingSeconds === 0) {
                  setRemainingSeconds(normalizeTimerSetting())
                }
                setIsTimerRunning((prev) => !prev)
              }}
              className="flex items-center justify-center h-10 border border-xp-border bg-xp-bg text-sm font-medium text-text-white transition-all duration-150 hover:cursor-pointer hover:brightness-110 hover:border-cyan-300 active:scale-[0.99]"
            >
              {isTimerRunning ? "暫停" : "開始"}
            </button>
            <button
              type="button"
              onClick={resetTimer}
              className="flex items-center justify-center h-10 border border-reroll-border bg-bg-black text-sm font-medium text-text-white transition-all duration-150 hover:cursor-pointer hover:border-border-gold hover:bg-reroll-bg/70 active:scale-[0.99]"
            >
              重設
            </button>
          </div>
        </div>
      </div>
      <div className="mt-1 border-t border-reroll-border/80 pt-3">
        <button
          type="button"
          onClick={loadRandomTransitionBoard}
          className="flex items-center justify-between h-10 px-3 w-full border border-purple-300/70 bg-four-cost-card-dark text-sm font-medium text-text-white transition-all duration-150 hover:cursor-pointer hover:border-purple-200 hover:brightness-110 active:scale-[0.99]"
        >
          <span>過渡盤面</span>
          <span className="text-xs text-text-white/80">隨機</span>
        </button>
      </div>
    </section>
  )
}

export default SessionControls
