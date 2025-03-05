import "normalize.css"
import './App.css'
import { useState } from "react"
import Shop from "./components/cardShop"
import Seat from "./components/seat"
import Space from "./components/space"
import Directions from "./components/directions"

function App() {
  const [space, setSpace] = useState(Array.from({length: 28}, () => {return {}}));
  const [seat, setSeat] = useState(Array.from({ length: 9 }, () => { return {} }));
  const [seatAnimate, setSeatAnimate] = useState(new Map());
  const [spaceAnimate, setSpaceAnimate] = useState(new Map())
  const [hoverCard, setHoverCard] = useState(null)
  const [playerSide, setPlayerSide] = useState({})

  return (
    <>
      <div className="flex flex-col items-center justify-end w-full h-fit min-h-screen pt-20 bg-neutral-300/55 text-black">
        <div className="w-fit mx-auto">
          <div className="relative">
            <Directions />
            <Space
              space={space}
              setHoverCard={setHoverCard}
              spaceAnimate={spaceAnimate}
            />
          </div>
          <Seat
            seat={seat}
            setHoverCard={setHoverCard}
            seatAnimate={seatAnimate}
          />
          <Shop
            space={space}
            setSpace={setSpace}
            seat={seat}
            setSeat={setSeat}
            hoverCard={hoverCard}
            setHoverCard={setHoverCard}
            playerSide={playerSide}
            setPlayerSide={setPlayerSide}
            setSeatAnimate={setSeatAnimate}
            setSpaceAnimate={setSpaceAnimate}
          />
        </div>
      </div>
    </>
  );
}

export default App
