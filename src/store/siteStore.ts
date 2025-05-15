import { create } from "zustand"
import { ChampionData } from "../types/shopStoreTypes"
import { useShopStore } from "./shopStore"

export type BoardUnit = ChampionData | null
type AnimationMap = Map<number, number>
type Updater<T> = T | ((prev: T) => T)
type HoverCard = {
  place: string
  index: number
  cardData: BoardUnit
}

interface SiteStore {
  seat: BoardUnit[]
  space: BoardUnit[]
  seatAnimate: AnimationMap
  spaceAnimate: AnimationMap
  hoverCard: HoverCard | null
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
  setHoverCard: (updater: Updater<HoverCard | null>) => void
  dragStart: (event: React.DragEvent<HTMLElement>, item: BoardUnit, index: number, place:string) => void
  drop: (event: React.DragEvent<HTMLElement>, endIndex: number, endPlace: string) => void
  dragOver:(event: React.DragEvent<HTMLElement>) => void
}

export const useSiteStore = create<SiteStore>((set, get) => {
  return  ({
    seat: Array(9).fill(null),
    space: Array(28).fill(null),
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
    dragStart: (event: React.DragEvent<HTMLElement>, item: BoardUnit, index: number, place: string) => {
      const { setIsDragging } = useShopStore.getState()

      const data = {
        item,
        startIndex: index,
        startPlace: place
      }
      event.dataTransfer.setData("text/plain", JSON.stringify(data))
      event.dataTransfer.effectAllowed = "move"
      event.dataTransfer.dropEffect = "move"

      setIsDragging(true)
    },
    drop: (event: React.DragEvent<HTMLElement>, endIndex: number, endPlace: string) => {
      const data = event.dataTransfer.getData("text/plain")
      const parseData = JSON.parse(data)
      const startIndex = parseData.startIndex
      const startPlace = parseData.startPlace
      const item = parseData.item
      const { setIsDragging } = useShopStore.getState()

      // 若由備戰席開始拖曳
      if (startPlace === "seat") {
        if (endPlace === "seat") {
          set((state) => {
            const newSeat = [...state.seat]
            newSeat[startIndex] = newSeat[endIndex]
            newSeat[endIndex] = item
            return { seat: newSeat }
          })
        }

        if (endPlace === "space") {
          const { space } = get()
          const { level } = useShopStore.getState()
          // 若移至戰區則須考慮戰區卡牌上限，最高和等級相同，只能與戰區卡牌交換，不可放至空格
          if (space[endIndex] === null) {
            const spaceCount = space.reduce((acc, item) => {
              if (item) acc += 1
              return acc
            }, 0)

            if (spaceCount >= level) return
          }
          set((state) => {
            const newSeat = [...state.seat]
            const newSpace = [...state.space]
            newSeat[startIndex] = newSpace[endIndex]
            newSpace[endIndex] = item
            return { seat: newSeat, space: newSpace }
          })
        }
      }

      // 若由戰區開始拖曳
      if (startPlace === "space") {
        if (endPlace === "seat") {
          set((state) => {
            const newSpace = [...state.space]
            const newSeat = [...state.seat]
            newSpace[startIndex] = newSeat[endIndex]
            newSeat[endIndex] = item
            return { seat: newSeat, space: newSpace }
          })
        }

        if (endPlace === "space") {
          set((state) => {
            const newSpace = [...state.space]
            newSpace[startIndex] = newSpace[endIndex]
            newSpace[endIndex] = item
            return { space: newSpace }
          })
        }
      }

      setIsDragging(false)
    },
    dragOver: (event: React.DragEvent<HTMLElement>) => {
      const isData = event.dataTransfer.types.includes("text/plain")
      if (isData) {
        event.preventDefault()
      }
    }
  })
})