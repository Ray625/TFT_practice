import { useState, useEffect, useCallback } from "react"
import champion from "../assets/tft-champion-set13.json"
import trait from "../assets/tft-trait-set13.json"
import shopRates from "../assets/tft-shop-drop-rates-data.json"

const Shop = ({ setSeat, hoverCard, setHoverCard }) => {
  const [level, setLevel] = useState(8);
  const [xp, setXp] = useState(0);
  const [total, setTotal] = useState(40);
  const xpList = [2, 2, 6, 10, 20, 36, 48, 76, 84, 0];
  const levelNeededXp = xpList[level - 1];
  const levelRate = shopRates.data.Shop[`${level - 1}`].dropRatesByTier;

  const [shopList, setShopList] = useState([
    {
      count: 30,
      id: "TFT13_Singed",
      name: "辛吉德",
      tier: 1,
      image: {
        full: "TFT13_Singed.TFT_Set13.png",
      },
      trait: ["Crime", "Titan"],
    },
    {
      count: 30,
      id: "TFT13_Amumu",
      name: "阿姆姆",
      tier: 1,
      image: {
        full: "TFT13_Amumu.TFT_Set13.png",
      },
      trait: ["Hextech", "Watcher"],
    },
    {
      count: 30,
      id: "TFT13_Singed",
      name: "辛吉德",
      tier: 1,
      image: {
        full: "TFT13_Singed.TFT_Set13.png",
      },
      trait: ["Crime", "Titan"],
    },
    {
      count: 30,
      id: "TFT13_Amumu",
      name: "阿姆姆",
      tier: 1,
      image: {
        full: "TFT13_Amumu.TFT_Set13.png",
      },
      trait: ["Hextech", "Watcher"],
    },
    {
      count: 30,
      id: "TFT13_Singed",
      name: "辛吉德",
      tier: 1,
      image: {
        full: "TFT13_Singed.TFT_Set13.png",
      },
      trait: ["Crime", "Titan"],
    },
  ]);

  const championList = { ...champion.data }; // 將json資料複製出來，並給角色加上卡池張數，再存於state中備用
  Object.values(championList).map((item) => {
    switch (item.tier) {
      case 1:
        item.count = 30;
        break;
      case 2:
        item.count = 22;
        break;
      case 3:
        item.count = 17;
        break;
      case 4:
        item.count = 10;
        break;
      case 5:
        item.count = 9;
        break;
      case 6:
        item.count = 9;
        break;
    }
  });
  const [banner, setBanner] = useState(championList);

  const handleDrawCard = () => {
    if (total < 2) return
    let cards = [];
    let shop = [];
    for (let i = 0; i < 5; i++) {
      let rateSum = 0;
      const starIndex = Math.floor(Math.random() * 100);
      for (let item of levelRate) {
        rateSum += item.rate;
        if (starIndex <= rateSum) {
          cards.push(item.cost);
          break;
        }
      }
    }
    cards.map((card) => {
      let bannerTotal = 0;
      Object.values(banner).map((cardData) => {
        if (cardData.tier === card) {
          bannerTotal += cardData.count;
        }
      });
      let cardTotal = 0;
      const cardIndex = Math.floor(Math.random() * bannerTotal);
      for (let cardData of Object.values(banner)) {
        if (cardData.tier === card) {
          cardTotal += cardData.count;
        }
        if (cardIndex <= cardTotal) {
          shop.push(cardData);
          break;
        }
      }
    });
    setShopList(shop);
    setTotal(preTotal => preTotal - 2)
  };

  useEffect(() => {
    const handlePressKey = (event) => {
      if (event.keyCode === 70) {
        handleBuyXp();
      }

      if (event.keyCode === 68) {
        handleDrawCard();
      }

      if (event.keyCode === 69) {
        handleSellCard(hoverCard);
      }
    };

    window.addEventListener("keydown", handlePressKey);

    return () => {
      window.removeEventListener("keydown", handlePressKey);
    };
  }, [level, xp, total, hoverCard]);

  const handleBuyXp = useCallback(() => {
    if (level >= 10) return; // 滿等時無法購買經驗

    if (levelNeededXp - xp > 4) {
      // 在購買經驗後不足以提升等級時
      if (total >= 4) {
        setTotal((prevTotal) => prevTotal - 4);
        setXp((prevXp) => prevXp + 4);
      }
      if (total < 4) {
        // 錢不夠4元時無法購買經驗
        return;
      }
    }

    if (levelNeededXp - xp <= 4) {
      // 在購買經驗後將提升等級時
      if (total >= 4) {
        setTotal((prevTotal) => prevTotal - 4);
        setXp((prevXp) => 4 - levelNeededXp + prevXp);
        setLevel((prevLevel) => prevLevel + 1);
      }
      if (total < 4) {
        return;
      }
    }
  }, [level, xp, total, levelNeededXp]);

  const handleBuyCard = (card, index) => {
    const cost = card.tier
    if (total < cost) return
    // 將商店該牌移除
    setShopList((prevShopList) =>
      prevShopList.map((item, i) => (i === index ? {} : item))
    );

    // 將該牌加入備戰席
    setSeat((prevSeat) => {
      let done = false;
      return prevSeat.map((item) => {
        if (!item.name && !done) {
          done = true;
          return { ...card };
        }
        return item;
      });
    });

    setTotal(prevTotal=> prevTotal - cost)
  };

  const handleSellCard = (hoverCard) => {
    if (hoverCard) {
      setSeat(prevSeat => prevSeat.map((item, i) => (i === hoverCard.index) ? {} : item))
      setTotal(prevTotal => prevTotal + hoverCard.tier)
      setHoverCard(null)
    }
  };

  return (
    <>
      <div className="relative flex flex-col w-360 mx-auto font-sans">
        <div className="relative z-10 flex items-end w-full aspect-[209/8]">
          <div className="relative top-1 z-10 h-full p-1 aspect-[75/16] bg-border-gold [clip-path:polygon(0%_0%,85%_0%,100%_100%,0%_100%)]">
            <div className="w-full p-1 aspect-[75/16] bg-bg-black [clip-path:polygon(0%_0%,85%_0%,100%_100%,0%_100%)]">
              <div className="flex flex-row items-end w-full">
                <h5 className="text-2xl/7 pl-1 text-text-white text-left">
                  {`等級 ${level}`}
                </h5>
                <p className="text-l ml-[34%] text-text-white">{`${xp}/${levelNeededXp}`}</p>
              </div>
            </div>
          </div>
          <div className="relative -left-[2.2%] h-4/6 aspect-[54/6] bg-bg-black/80 [clip-path:polygon(0%_0%,92.5%_0%,100%_100%,6.5%_100%)]">
            <div className="flex flex-row items-center justify-between w-4/5 h-full mx-auto opacity-90">
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 bg-one-cost rounded-full"></div>
                <p className="text-one-cost font-extralight">{`${levelRate[0].rate}%`}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 bg-two-cost rounded-full"></div>
                <p className="text-two-cost font-extralight">{`${levelRate[1].rate}%`}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 bg-three-cost [clip-path:polygon(50%_0%,100%_100%,0%_100%)]"></div>
                <p className="text-three-cost font-extralight">{`${levelRate[2].rate}%`}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-1.5 h-1.5 bg-four-cost rotate-45"></div>
                <p className="text-four-cost font-extralight">{`${levelRate[3].rate}%`}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 bg-five-cost [clip-path:polygon(50%_0%,100%_39.5%,80.5%_100%,19.5%_100%,0%_39.5%)]"></div>
                <p className="text-five-cost font-extralight">{`${levelRate[4].rate}%`}</p>
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 h-full p-1 aspect-[15/4] bg-border-gold [clip-path:polygon(20%_0%,80%_0%,100%_100%,0%_100%)]">
            <div className="w-full aspect-[15/4] p-1.5 bg-gold-bg [clip-path:polygon(20%_0%,80%_0%,100%_100%,0%_100%)]">
              <h5 className="flex items-center justify-center pt-1 text-2xl/7 text-text-white text-center">
                <img
                  className="w-5 h-5 mr-2"
                  src="/img/item/Gold.png"
                  alt="icon"
                />
                {total}
              </h5>
            </div>
          </div>
        </div>
        <div className="relative z-0 grid grid-cols-6 gap-2 w-full p-2 aspect-[104/14] bg-bg-black border-4 border-border-gold shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]">
          <div className="flex flex-col gap-2 h-full bg-bg-black">
            <button
              className="relative h-full flex flex-col bg-xp-bg border-2 border-xp-border active:opacity-90 hover:opacity-80 hover:cursor-pointer transition-opacity duration-150"
              onClick={handleBuyXp}
              title="購買經驗(F)"
            >
              <h6 className="text-xl m-0 pt-1 pl-2 text-text-white text-left">
                購買XP
              </h6>
              <p className="flex items-center justify-start pl-2 text-xl  text-text-white">
                <img
                  className="w-4 h-4 mr-2 mt-1"
                  src="/img/item/Gold.png"
                  alt="icon"
                />
                4
              </p>
              <div className="absolute right-0 top-0 w-full h-full bg-xp-icon [clip-path:polygon(42%_0%,100%_0%,100%_100%,73%_100%)]">
                <img
                  className="absolute right-3 top-3 w-12 h-12"
                  src="/img/item/xp.png"
                  alt="icon"
                />
              </div>
            </button>
            <button
              className="relative h-full flex flex-col bg-reroll-bg border-2 border-reroll-border active:opacity-90 hover:opacity-80 hover:cursor-pointer transition-opacity duration-150"
              title="刷新商店(D)"
              onClick={handleDrawCard}
            >
              <h6 className="text-xl m-0 pt-1 pl-2 text-text-white text-left">
                刷新
              </h6>
              <p className="flex items-center justify-start pl-2 text-xl  text-text-white">
                <img
                  className="w-4 h-4 mr-2 mt-1"
                  src="/img/item/Gold.png"
                  alt="icon"
                />
                2
              </p>
              <div className="absolute right-0 top-0 w-full h-full bg-reroll-icon [clip-path:polygon(42%_0%,100%_0%,100%_100%,73%_100%)]">
                <img
                  className="absolute right-3 top-3 w-12 h-12"
                  src="/img/item/reroll.png"
                  alt="icon"
                />
              </div>
            </button>
          </div>
          {shopList.map((item, index) => {
            if (!item.name)
              return (
                <div
                  className="flex flex-col justify-center items-center h-full p-1 bg-empty-card-wrapper border "
                  key={index}
                >
                  <div className="w-9/10 h-9/10 border-2 border-empty-card-border bg-empty-card-bg"></div>
                </div>
              );

            let cost;
            switch (item?.tier) {
              case 1:
                cost = "one";
                break;
              case 2:
                cost = "two";
                break;
              case 3:
                cost = "three";
                break;
              case 4:
                cost = "four";
                break;
              case 5:
                cost = "five";
                break;
              default:
                cost = null;
            }
            const body = (
              <>
                <div
                  className={`relative border-2 border-${cost}-cost-card-light`}
                  onClick={() => handleBuyCard(item, index)}
                >
                  <div className="border border-card-border">
                    <img
                      className="w-full aspect-[69/40]"
                      src={`/img/champion/${item.image.full}`}
                      alt="champion"
                    />
                  </div>
                  <div className="absolute top-0 left-0 flex flex-col justify-end pl-1 w-full h-full">
                    {item.trait.map((traitName) => {
                      const traitData = trait.data[`TFT13_${traitName}`];
                      return (
                        <div className="flex flex-row" key={traitData.id}>
                          <div className="w-fit h-fit p-[1px] mr-1 bg-trait-icon-shadow [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                            <div className="flex justify-center items-center w-5 h-6 bg-trait-icon-bg [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                              <img
                                src={`/img/trait/${traitData.image.full}`}
                                alt="icon"
                                className="w-3 h-3"
                              />
                            </div>
                          </div>
                          <p className="text-lg text-text-white text-left">
                            {traitData.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className={`flex flex-row justify-between items-center px-2 bg-linear-to-r from-${cost}-cost-card-dark to-${cost}-cost-card-light grow`}
                >
                  <p className="text-xl text-text-white">{item.name}</p>
                  <p className="flex items-center justify-start text-lg text-text-white font-light font-sans leading-none">
                    <img
                      className="w-4 h-4 mr-2 mt-1"
                      src="/img/item/Gold.png"
                      alt="icon"
                    />
                    {item.tier}
                  </p>
                </div>
              </>
            );

            return (
              <div
                className="flex flex-col h-full p-1 bg-bg-black border hover:opacity-90 hover:cursor-pointer transition-opacity duration-150"
                key={index}
              >
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Shop