export interface ChampionImage {
  full: string
}

export interface ChampionData {
  id: string
  name: string
  tier: number
  image: ChampionImage
  faceImage?: ChampionImage
  count: number
  trait: string[]
  range?: number
  role?: string | null
  star?: number
}

export interface ChampionJSON {
  data: {
    [key: string]: Omit<ChampionData, 'count'>
  }
}

export interface TraitData {
  type: string
  version: string
  data: {
    [key: string]: {
      id: string
      name: string
      image: {
        full: string
      }
      effects?: {
        minUnits: number
        maxUnits: number
        style: number
      }[]
    }
  }
}

export type MatchesTuple = ["space" | "seat", number]
export type MatchesType = MatchesTuple[]

export type SeasonKey = "set13" | "set14" | "set17"

type Updater<T> = T | ((prev: T) => T)

export interface ShopStore {
  level: number
  xp: number
  total: number | string
  season: string
  shopList: (ChampionData | null)[]
  banner: Record<string, ChampionData>
  isOutside: boolean
  dragTargetIndex: number | null
  isDragging: boolean

  setLevel: (updater: Updater<number>) => void
  setTotal: (updater: Updater<number | string>) => void
  setSeason: (updater: SeasonKey) => void
  resetRun: (initialLevel: number, initialTotal: number) => void
  setIsOutside: (updater: boolean) => void
  setDragTargetIndex: (updater: number | null) => void
  setIsDragging: (updater: boolean) => void
  drawCard: () => void
  buyXp: () => void
  buyCard: (card: ChampionData, index: number) => void
  sellCard: (hoverCard: Record<string, any>) => void
  placeCard: (hoverCard: Record<string, any>) => void
  checkIsOutside: (x: number, y: number, rect: DOMRect) => void
  dropToSellCard: (hoverCard: Record<string, any> | null) => void
}
