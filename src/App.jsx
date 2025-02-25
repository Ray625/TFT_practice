import "normalize.css"
import './App.css'
import Shop from "./components/cardShop"
import Seat from "./components/seat"
import { useState } from "react"

function App() {
  const [seat, setSeat] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}]);
  const [hoverCard, setHoverCard] = useState(null)
  const [playerSide, setPlayerSide] = useState({})

  return (
    <>
      <div className="flex flex-col items-center justify-end w-full h-screen bg-neutral-300/55 text-black">
        <Seat seat={seat} setHoverCard={setHoverCard} />
        <Shop
          seat={seat}
          setSeat={setSeat}
          hoverCard={hoverCard}
          setHoverCard={setHoverCard}
          playerSide={playerSide}
          setPlayerSide={setPlayerSide}
        />
      </div>
    </>
  );
}

export default App
