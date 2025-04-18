import { useShopStore } from "../store/shopStore"

const ChangeSeasonButton = () => {
  const { setSeason } = useShopStore()

  return (
    <select className="absolute right-40 h-fit p-1 pr-2 bg-reroll-bg text-white rounded" name="season" onChange={(event) => {
      const value = event.target.value
      if (value) setSeason(value as "set13" | "set14")
    }}>
      <option value="set14">Set 14</option>
      <option value="set13">Set 13</option>
    </select>
  )
}

export default ChangeSeasonButton