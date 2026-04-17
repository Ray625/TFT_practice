import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

const [, , seasonArg = "set17", sourceArg = "latest"] = process.argv
const seasonNumber = seasonArg.replace(/^set/i, "")
const seasonKey = `set${seasonNumber}`
const tftPrefix = `TFT${seasonNumber}_`
const root = process.cwd()

const cdragonBase = `https://raw.communitydragon.org/${sourceArg}`
const cdragonTftUrl = `${cdragonBase}/cdragon/tft/zh_tw.json`
const versionsUrl = "https://ddragon.leagueoflegends.com/api/versions.json"

const toAssetUrl = (assetPath) => {
  return `${cdragonBase}/game/${assetPath.toLowerCase().replace(/^assets\//, "assets/").replace(/\.tex$/, ".png")}`
}

const fetchJson = async (url) => {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`)
  return response.json()
}

const downloadFile = async (url, filePath) => {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`)

  await mkdir(path.dirname(filePath), { recursive: true })
  const buffer = Buffer.from(await response.arrayBuffer())
  await writeFile(filePath, buffer)
}

const downloadAll = async (items, concurrency = 8) => {
  let index = 0
  const failures = []

  const workers = Array.from({ length: concurrency }, async () => {
    while (index < items.length) {
      const current = items[index++]
      try {
        await downloadFile(current.url, current.filePath)
      } catch (error) {
        failures.push({ ...current, error })
      }
    }
  })

  await Promise.all(workers)
  return failures
}

const main = async () => {
  const [versions, cdragonTft] = await Promise.all([
    fetchJson(versionsUrl),
    fetchJson(cdragonTftUrl),
  ])

  const patch = versions[0]
  const ddragonChampionUrl = `https://ddragon.leagueoflegends.com/cdn/${patch}/data/zh_TW/tft-champion.json`
  const ddragonTraitUrl = `https://ddragon.leagueoflegends.com/cdn/${patch}/data/zh_TW/tft-trait.json`
  const [ddragonChampions, ddragonTraits] = await Promise.all([
    fetchJson(ddragonChampionUrl),
    fetchJson(ddragonTraitUrl),
  ])

  const cdragonSet = cdragonTft.sets?.[seasonNumber]
  if (!cdragonSet) throw new Error(`Cannot find TFT set ${seasonNumber} in ${cdragonTftUrl}`)

  const ddragonChampionById = new Map(
    Object.values(ddragonChampions.data).map((champion) => [champion.id, champion])
  )
  const ddragonTraitsByName = new Map(
    Object.values(ddragonTraits.data)
      .filter((trait) => trait.id?.startsWith(tftPrefix))
      .map((trait) => [trait.name, trait])
  )
  const cdragonTraitsByName = new Map(
    cdragonSet.traits.map((trait) => [trait.name, trait])
  )

  const cdragonChampions = cdragonSet.champions
    .filter((champion) => {
      return (
        champion.apiName?.startsWith(tftPrefix) &&
        champion.cost > 0 &&
        champion.cost <= 5 &&
        champion.traits?.length
      )
    })
    .sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name, "zh-Hant"))

  const championData = {}
  const usedTraitIds = new Set()
  const missingTraits = []
  const downloads = []

  for (const champion of cdragonChampions) {
    const ddragonChampion = ddragonChampionById.get(champion.apiName)
    if (!ddragonChampion) continue

    const traitSuffixes = champion.traits.flatMap((traitName) => {
      const trait = ddragonTraitsByName.get(traitName)
      if (!trait) {
        missingTraits.push({ champion: champion.apiName, traitName })
        return []
      }

      usedTraitIds.add(trait.id)
      return trait.id.replace(tftPrefix, "")
    })

    championData[champion.apiName] = {
      id: champion.apiName,
      name: champion.name,
      tier: champion.cost,
      image: {
        full: ddragonChampion.image.full,
      },
      faceImage: {
        full: `${champion.apiName}.png`,
      },
      trait: traitSuffixes,
    }

    downloads.push({
      url: `https://ddragon.leagueoflegends.com/cdn/${patch}/img/tft-champion/${ddragonChampion.image.full}`,
      filePath: path.join(root, "public", "img", "champion", seasonKey, ddragonChampion.image.full),
    })

    if (champion.squareIcon) {
      downloads.push({
        url: toAssetUrl(champion.squareIcon),
        filePath: path.join(root, "public", "img", "face", seasonKey, `${champion.apiName}.png`),
      })
    }
  }

  const traitData = {}
  for (const trait of Object.values(ddragonTraits.data)) {
    if (!usedTraitIds.has(trait.id)) continue
    const cdragonTrait = cdragonTraitsByName.get(trait.name)

    traitData[trait.id] = {
      id: trait.id,
      name: trait.name,
      image: {
        full: trait.image.full,
      },
      effects: (cdragonTrait?.effects ?? [])
        .map((effect) => ({
          minUnits: effect.minUnits,
          maxUnits: effect.maxUnits,
          style: effect.style,
        }))
        .filter((effect) => effect.minUnits > 0)
        .sort((a, b) => a.minUnits - b.minUnits),
    }

    downloads.push({
      url: `https://ddragon.leagueoflegends.com/cdn/${patch}/img/tft-trait/${trait.image.full}`,
      filePath: path.join(root, "public", "img", "trait", seasonKey, trait.image.full),
    })
  }

  await mkdir(path.join(root, "src", "assets"), { recursive: true })
  await writeFile(
    path.join(root, "src", "assets", `tft-champion-${seasonKey}.json`),
    `${JSON.stringify({ data: championData }, null, 2)}\n`
  )
  await writeFile(
    path.join(root, "src", "assets", `tft-trait-${seasonKey}.json`),
    `${JSON.stringify({ type: "tft-trait", version: patch, data: traitData }, null, 2)}\n`
  )

  const failures = await downloadAll(downloads)

  console.log(`Updated ${seasonKey} from CommunityDragon ${sourceArg} and Data Dragon ${patch}`)
  console.log(`Champions: ${Object.keys(championData).length}`)
  console.log(`Traits: ${Object.keys(traitData).length}`)
  console.log(`Images requested: ${downloads.length}`)

  if (missingTraits.length) {
    console.warn("Missing trait mappings:")
    for (const item of missingTraits) {
      console.warn(`- ${item.champion}: ${item.traitName}`)
    }
  }

  if (failures.length) {
    console.warn("Failed downloads:")
    for (const failure of failures) {
      console.warn(`- ${failure.url} -> ${failure.filePath}: ${failure.error.message}`)
    }
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
