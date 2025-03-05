const Directions = () => {
  return (
    <div className="absolute left-0 top-0 flex flex-col gap-2 ml-2 p-4 w-50 h-fit text-start text-text-white bg-reroll-bg border-2 border-reroll-border">
      <h3 className="text-2xl font-extrabold">TFT模擬器</h3>
      <p className="text-lg">練習及熟悉陣容，金錢及等級可自行調整，金錢可透過單擊按鈕 +10元，也可直接點擊金錢並輸入數字。</p>
      <h3 className="text-2xl font-bold">操作說明</h3>
      <p className="text-lg">刷牌：D</p>
      <p className="text-lg">升級：F</p>
      <p className="text-lg">賣牌：將滑鼠指向棋子 + E</p>
      <p className="text-lg">放置棋子：將滑鼠指向棋子 + W</p>
    </div>
  );
}

export default Directions