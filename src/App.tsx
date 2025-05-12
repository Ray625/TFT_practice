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
      <div className="flex flex-col items-center justify-center w-fit min-w-screen h-fit min-h-screen pt-4 bg-neutral-300/55 text-black">
        <div className="w-fit mx-auto">
          <div className="relative flex flex-col gap-y-4 items-start lg:flex-row mb-8 xl:mb-4 px-4 xl:w-360">
            <Directions />
            <div className="static self-center xl:absolute xl:left-1/2 xl:-translate-x-1/2">
              <Space />
            </div>
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
