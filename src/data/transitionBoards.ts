export interface TransitionBoardTemplate {
  id: string
  name: string
  unitIds: string[]
  preferredTwoStarIds: string[]
}

export const set17TransitionBoards: TransitionBoardTemplate[] = [
  {
    id: "drx-fateweaver-wide",
    name: "DRX 命運寬羈絆",
    unitIds: [
      "TFT17_Aatrox",
      "TFT17_Maokai",
      "TFT17_Pantheon",
      "TFT17_Caitlyn",
      "TFT17_TwistedFate",
      "TFT17_Milio",
      "TFT17_Lulu",
    ],
    preferredTwoStarIds: [
      "TFT17_Aatrox",
      "TFT17_Maokai",
      "TFT17_Pantheon",
      "TFT17_Caitlyn",
      "TFT17_Milio",
      "TFT17_Lulu",
    ],
  },
  {
    id: "space-timebreaker-wide",
    name: "太空時間寬羈絆",
    unitIds: [
      "TFT17_Nasus",
      "TFT17_Poppy",
      "TFT17_Pantheon",
      "TFT17_Teemo",
      "TFT17_Veigar",
      "TFT17_Samira",
      "TFT17_Milio",
    ],
    preferredTwoStarIds: [
      "TFT17_Nasus",
      "TFT17_Poppy",
      "TFT17_Pantheon",
      "TFT17_Teemo",
      "TFT17_Veigar",
      "TFT17_Samira",
      "TFT17_Milio",
    ],
  },
]
