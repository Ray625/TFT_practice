export interface ChampionImage {
  full: string
}

export interface ChampionData {
  id: string
  name: string
  tier: number
  image: ChampionImage
  count: number
  trait: string[]
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
    }
  }
}

export type MatchesTuple = ["space" | "seat", number]
export type MatchesType = MatchesTuple[]

type Updater<T> = T | ((prev: T) => T)

export interface ShopStore {
  level: number
  xp: number
  total: number | string
  set: string
  shopList: (ChampionData | null)[]
  banner: Record<string, ChampionData>

  setLevel: (updater: Updater<number>) => void
  setTotal: (updater: Updater<number | string>) => void
  drawCard: () => void
  buyXp: () => void
  buyCard: (card: ChampionData, index: number) => void
  sellCard: (hoverCard: Record<string, any>) => void
  placeCard: (hoverCard: Record<string, any>) => void
}