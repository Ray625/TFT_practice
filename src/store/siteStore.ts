import { create } from "zustand"
import { ChampionData } from "../types/shopStoreTypes"

type BoardUnit = ChampionData | Partial<ChampionData>
type AnimationMap = Map<number, number>
type Updater<T> = T | ((prev: T) => T)

interface SiteStore {
  seat: BoardUnit[]
  space: BoardUnit[]
  seatAnimate: AnimationMap
  spaceAnimate: AnimationMap
  hoverCard: BoardUnit | null
  playerSide: {
    [key: string]: {
    owned: number
  }}

  setSeat: (updater: Updater<BoardUnit[]>) => void
  setSpace: (updater: Updater<BoardUnit[]>) => void
  setPlayerSide: (updater: Updater<{
    [key: string]: {
    owned: number
  }}>) => void
  setSeatAnimate: (updater: Updater<AnimationMap>) => void
  setSpaceAnimate: (updater: Updater<AnimationMap>) => void
  setHoverCard: (updater: Updater<BoardUnit | null>) => void
}

export const useSiteStore = create<SiteStore>((set) => ({
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