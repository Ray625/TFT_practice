import { create } from "zustand"

export const useSiteStore = create((set, get) => ({
  seat: Array.from({ length: 9 }, () => ({})),
  space: Array.from({ length: 28 }, () => ({})),
  seatAnimate: new Map(),
  spaceAnimate: new Map(),
  hoverCard: null,
  playerSide: {},
  setSeat: (updater) => {
    set((state) => ({
      seat: typeof updater === "function" ? updater(state.seat) : updater,
    }))
  },
  setSpace: (updater) => {
    set((state) => ({
      space: typeof updater === "function" ? updater(state.space) : updater,
    }))
  },
  setPlayerSide: (updater) => {
    set((state) => ({
      playerSide:
        typeof updater === "function" ? updater(state.playerSide) : updater,
    }))
  },
  setSeatAnimate: (updater) => {
    set((state) => ({
      seatAnimate:
        typeof updater === "function" ? updater(state.seatAnimate) : updater,
    }))
  },
  setSpaceAnimate: (updater) => {
    set((state) => ({
      spaceAnimate:
        typeof updater === "function" ? updater(state.spaceAnimate) : updater,
    }))
  },
  setHoverCard: (updater) => {
    set((state) => ({
      hoverCard:
        typeof updater === "function" ? updater(state.hoverCard) : updater,
    }))
  },
}))