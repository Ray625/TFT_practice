import "normalize.css"
import './App.css'
import Shop from "./components/cardShop"
import Seat from "./components/seat"
import Space from "./components/space"
import TraitPanel from "./components/traitPanel"

function App() {

  return (
    <>
      <div className="flex flex-col items-center justify-center w-fit min-w-screen h-fit min-h-screen pt-4 bg-neutral-300/55 text-black overflow-hidden">
        <div className="w-fit mx-auto">
          <div className="grid grid-cols-1 gap-4 items-start mb-8 px-4 lg:grid-cols-[14.5rem_auto_14.5rem] xl:grid-cols-[14.5rem_auto_14.5rem] xl:w-360 xl:mb-4">
            <div className="w-full lg:w-fit">
              <TraitPanel />
            </div>
            <div className="justify-self-center">
              <Space />
            </div>
            <div className="hidden lg:block" aria-hidden="true" />
          </div>
          <Seat />
          <Shop />
        </div>
      </div>
    </>
  )
}

export default App
