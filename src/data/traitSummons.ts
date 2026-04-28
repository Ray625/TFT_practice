import { ChampionData } from "../types/shopStoreTypes"

const summonName = "比亞與拜亞"
const summonTraitId = "TFT17_SummonTrait"

const shepherdSummonByBreakpoint: Record<3 | 5 | 7, ChampionData> = {
  3: {
    id: "TFT17_SUMMONTRAIT_3",
    name: summonName,
    tier: 1,
    image: { full: "Trait_Icon_17_Shepherd.TFT_Set17.png" },
    count: 0,
    trait: [],
    range: 1,
    role: "Summon",
    star: 1,
    isSummon: true,
    summonTraitId,
    summonBreakpoint: 3,
  },
  5: {
    id: "TFT17_SUMMONTRAIT_5",
    name: summonName,
    tier: 2,
    image: { full: "Trait_Icon_17_Shepherd.TFT_Set17.png" },
    count: 0,
    trait: [],
    range: 1,
    role: "Summon",
    star: 1,
    isSummon: true,
    summonTraitId,
    summonBreakpoint: 5,
  },
  7: {
    id: "TFT17_SUMMONTRAIT_7",
    name: summonName,
    tier: 3,
    image: { full: "Trait_Icon_17_Shepherd.TFT_Set17.png" },
    count: 0,
    trait: [],
    range: 1,
    role: "Summon",
    star: 1,
    isSummon: true,
    summonTraitId,
    summonBreakpoint: 7,
  },
}

export const getShepherdSummon = (count: number) => {
  if (count >= 7) return shepherdSummonByBreakpoint[7]
  if (count >= 5) return shepherdSummonByBreakpoint[5]
  if (count >= 3) return shepherdSummonByBreakpoint[3]
  return null
}
