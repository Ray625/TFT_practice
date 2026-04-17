import { useShopStore } from "../store/shopStore"
import { SeasonKey } from "../types/shopStoreTypes"

const ChangeSeasonButton = () => {
  const { setSeason } = useShopStore()

  return (
    <select className="absolute right-4 top-0 lg:static h-fit p-1 pr-2 mx-2 bg-reroll-bg text-white rounded" name="season" onChange={(event) => {
      const value = event.target.value
      if (value) setSeason(value as SeasonKey)
    }}>
      <option value="set17">Set 17</option>
      <option value="set14">Set 14</option>
      <option value="set13">Set 13</option>
    </select>
  )
}

export default ChangeSeasonButton
