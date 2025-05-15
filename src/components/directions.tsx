const Directions = () => {
  return (
    <div className="flex flex-col gap-2 w-fit lg:w-50 h-fit px-6 py-4 lg:p-4 lg:mx-2 text-start text-text-white bg-reroll-bg border-2 border-reroll-border">
      <h3 className="text-2xl font-bold">操作說明</h3>
      <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
        <p className="hidden lg:block text-base">刷牌：D</p>
        <p className="hidden lg:block text-base">升級：F</p>
        <p className="hidden lg:block text-base">購買：單擊商店內卡牌，或將商店內卡牌拖曳出商店</p>
        <p className="hidden lg:block text-base">賣牌：將滑鼠指向棋子 + E，或將卡牌拖曳至商店</p>
        <p className="hidden lg:block text-base">放置棋子：將滑鼠指向棋子 + W，或將卡牌拖曳至指定位置</p>
        <p className="block lg:hidden text-lg">按下刷新按鈕刷新商店，按下購買XP購買經驗</p>
        <p className="text-xs">Tips：三張相同 1 星卡牌能合成 2 星，三張 2 星將合成 3 星</p>
        <p className="text-xs">上方戰場可放置卡牌最大數量與玩家等級相同</p>
      </div>
    </div>
  );
}

export default Directions