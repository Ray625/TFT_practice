type TraitEffectLike = {
  minUnits: number
  maxUnits: number
  style: number
  variables?: Record<string, number | string | null>
}

const formatValue = (value: number | string | null | undefined, multiplier = 1) => {
  if (value === null || value === undefined) return ""
  if (typeof value === "string") return value

  const next = value * multiplier
  if (Math.abs(next - Math.round(next)) < 0.001) {
    return String(Math.round(next))
  }

  return next.toFixed(1).replace(/\.0$/, "")
}

const replaceTemplateVars = (
  text: string,
  variables: Record<string, number | string | null> = {},
  fallbackMinUnits?: number,
) =>
  text.replace(/@([^@]+?)@/g, (_, rawToken: string) => {
    if (rawToken === "MinUnits" && fallbackMinUnits !== undefined) {
      return String(fallbackMinUnits)
    }

    const [key, multiplierToken] = rawToken.split("*")
    const baseValue = variables[key]

    if (baseValue === undefined || baseValue === null) {
      if (key === "MinUnits" && fallbackMinUnits !== undefined) {
        return String(fallbackMinUnits)
      }
      return ""
    }

    const multiplier = multiplierToken ? Number(multiplierToken) : 1
    return formatValue(baseValue, Number.isFinite(multiplier) ? multiplier : 1)
  })

const cleanupText = (text: string) =>
  text
    .replace(/%i:[^%]+%/g, "")
    .replace(/<\/?TFT[^>]*>/g, "")
    .replace(/<\/?rules>/g, "")
    .replace(/{{([^}]+)}}/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{2,}/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n +/g, "\n")
    .trim()

export const formatTraitDescription = (
  desc: string,
  effects: TraitEffectLike[] = [],
) => {
  if (!desc) return ""

  const firstVars = effects[0]?.variables ?? {}
  const firstMinUnits = effects[0]?.minUnits
  let rowIndex = 0

  const withRowsExpanded = desc
    .replace(/<(row|expandRow)>(.*?)<\/\1>/gs, (_, _tag: string, content: string) => {
      const effect = effects[rowIndex] ?? effects.at(-1)
      rowIndex += 1
      const resolved = replaceTemplateVars(
        content,
        effect?.variables ?? firstVars,
        effect?.minUnits ?? firstMinUnits,
      )
      return `${resolved}\n`
    })
    .replace(/<rules>(.*?)<\/rules>/gs, (_, content: string) => {
      const resolved = replaceTemplateVars(content, firstVars, firstMinUnits)
      return `\n${resolved}`
    })
    .replace(/<br\s*\/?>/g, "\n")

  const resolved = replaceTemplateVars(withRowsExpanded, firstVars, firstMinUnits)
  return cleanupText(resolved)
}
