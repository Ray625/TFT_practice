import "normalize.css"
import './App.css'
import Shop from "./components/cardShop"
import Seat from "./components/seat"
import Space from "./components/space"
import ChangeSeasonButton from "./components/changeSeasonButton"
import TraitPanel from "./components/traitPanel"

function App() {

  return (
    <>
      <div className="flex flex-col items-center justify-center w-fit min-w-screen h-fit min-h-screen pt-4 bg-neutral-300/55 text-black overflow-hidden">
        <div className="w-fit mx-auto">
          <div className="flex flex-col gap-4 items-start lg:flex-row lg:items-start mb-8 xl:mb-4 px-4 xl:w-360">
            <div className="w-full lg:w-fit shrink-0">
              <TraitPanel />
            </div>
            <div className="shrink-0">
              <ChangeSeasonButton/>
            </div>
            <div className="self-center lg:self-start">
              <Space />
            </div>
          </div>
          <Seat />
          <Shop />
        </div>
      </div>
    </>
  )
}

export default App
