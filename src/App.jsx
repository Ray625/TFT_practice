import "normalize.css"
import './App.css'
import Shop from "./components/cardShop"

function App() {
  return (
    <>
      <div className="flex items-center w-full h-screen bg-neutral-300/55 text-black">
        <Shop />
      </div>
    </>
  )
}

export default App
