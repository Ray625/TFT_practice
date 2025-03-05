const Directions = () => {
  return (
    <div className="absolute left-0 top-0 flex flex-col gap-2 ml-2 p-4 w-50 h-fit text-start text-text-white bg-reroll-bg border-2 border-reroll-border">
      <h3 className="text-2xl font-extrabold">TFT模擬器</h3>
      <p className="text-lg">練習及熟悉陣容，金錢及等級可自行調整。</p>
      <h3 className="text-2xl font-bold">操作說明</h3>
      <p className="text-lg">刷牌：D</p>
      <p className="text-lg">升級：F</p>
      <p className="text-lg">賣牌：將滑鼠指向棋子 + E</p>
      <p className="text-lg">放置棋子：將滑鼠指向棋子 + W</p>
      <p className="text-sm">Tips：相同 1 星卡牌能合成 2 星，三隻 2 星將合成 3 星。</p>
    </div>
  );
}

export default Directions