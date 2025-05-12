const Directions = () => {
  return (
    <div className="flex flex-col gap-2 w-fit lg:w-50 h-fit px-6 py-4 lg:p-4 lg:mx-2 text-start text-text-white bg-reroll-bg border-2 border-reroll-border">
      <h3 className="text-2xl font-extrabold">TFT模擬器</h3>
      <p className="text-lg">練習及熟悉陣容，金錢及等級可自行調整。</p>
      <h3 className="text-2xl font-bold">操作說明</h3>
      <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
        <p className="hidden lg:block text-lg">刷牌：D</p>
        <p className="hidden lg:block text-lg">升級：F</p>
        <p className="hidden lg:block text-lg">賣牌：將滑鼠指向棋子 + E</p>
        <p className="hidden lg:block text-lg">放置棋子：將滑鼠指向棋子 + W</p>
        <p className="block lg:hidden text-lg">按下刷新按鈕刷新商店，按下購買XP購買經驗</p>
        <p className="text-sm">Tips：相同 1 星卡牌能合成 2 星，三隻 2 星將合成 3 星。</p>
      </div>
    </div>
  );
}

export default Directions