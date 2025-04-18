import "normalize.css"
import './App.css'
import Shop from "./components/cardShop"
import Seat from "./components/seat"
import Space from "./components/space"
import Directions from "./components/directions"
import ChangeSeasonButton from "./components/changeSeasonButton"

function App() {

  return (
    <>
      <div className="flex flex-col items-center justify-end w-full h-fit min-h-screen pt-20 bg-neutral-300/55 text-black">
        <div className="w-fit mx-auto">
          <div className="relative flex flex-row">
            <Directions />
            <Space />
            <ChangeSeasonButton/>
          </div>
          <Seat />
          <Shop />
        </div>
      </div>
    </>
  )
}

export default App
