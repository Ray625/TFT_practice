import champion from "../assets/tft-champion-set13.json"

const Shop = () => {
  const items = [1, 2, 3, 4, 5]

  console.log(champion)

  return (
    <>
      <div className="relative flex flex-col w-360 mx-auto font-sans">
        <div className="relative z-10 flex items-end w-full aspect-[209/8]">
          <div className="relative top-1 z-10 h-full p-1 aspect-[75/16] bg-border-gold [clip-path:polygon(0%_0%,85%_0%,100%_100%,0%_100%)]">
            <div className="w-full p-1 aspect-[75/16] bg-bg-black [clip-path:polygon(0%_0%,85%_0%,100%_100%,0%_100%)]">
              <div className="flex flex-row items-end w-full">
                <h5 className="text-2xl/7 pl-1 text-text-white text-left">
                  等級 8
                </h5>
                <p className="text-l ml-[34%] text-text-white">12/76</p>
              </div>
            </div>
          </div>
          <div className="relative -left-[2.2%] h-4/6 aspect-[54/6] bg-bg-black/80 [clip-path:polygon(0%_0%,92.5%_0%,100%_100%,6.5%_100%)]">
            <div className="flex flex-row items-center justify-between w-4/5 h-full mx-auto opacity-90">
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 bg-one-cost rounded-full"></div>
                <p className="text-one-cost font-extralight">30%</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 bg-two-cost rounded-full"></div>
                <p className="text-two-cost font-extralight">40%</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 bg-three-cost [clip-path:polygon(50%_0%,100%_100%,0%_100%)]"></div>
                <p className="text-three-cost font-extralight">25%</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-1.5 h-1.5 bg-four-cost rotate-45"></div>
                <p className="text-four-cost font-extralight">5%</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 bg-five-cost [clip-path:polygon(50%_0%,100%_39.5%,80.5%_100%,19.5%_100%,0%_39.5%)]"></div>
                <p className="text-five-cost font-extralight">0%</p>
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 h-full p-1 aspect-[15/4] bg-border-gold [clip-path:polygon(20%_0%,80%_0%,100%_100%,0%_100%)]">
            <div className="w-full aspect-[15/4] p-1 bg-gold-bg [clip-path:polygon(20%_0%,80%_0%,100%_100%,0%_100%)]">
              <h5 className="flex items-center justify-center text-2xl/7 text-text-white text-center">
                <img
                  className="w-5 h-5 mr-2 mt-1"
                  src="/img/item/Gold.png"
                  alt="icon"
                />
                60
              </h5>
            </div>
          </div>
        </div>
        <div className="relative z-0 grid grid-cols-6 gap-2 w-full p-2 aspect-[104/14] bg-bg-black border-4 border-border-gold shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]">
          <div className="flex flex-col gap-2 h-full bg-bg-black">
            <button
              className="relative h-full flex flex-col bg-xp-bg border-2 border-xp-border hover:opacity-80 hover:cursor-pointer transition-opacity duration-150"
              onClick={() => alert("購買XP")}
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
              className="relative h-full flex flex-col bg-reroll-bg border-2 border-reroll-border hover:opacity-80 hover:cursor-pointer transition-opacity duration-150"
              onClick={() => alert("刷新")}
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
          {items.map((item) => {
            let body
            switch (item) {
              case 1:
                body = (
                  <>
                    <div className="relative border-2 border-one-cost-card-light">
                      <div className="border border-card-border">
                        <img
                          className="w-full aspect-[69/40]"
                          src="/img/champion/TFT13_Lux.TFT_Set13.png"
                          alt="champion"
                        />
                      </div>
                      <div className="absolute top-0 left-0 flex flex-col justify-end pl-1 w-full h-full">
                        <div className="flex flex-row">
                          <div className="w-fit h-fit p-[1px] mr-1 bg-trait-icon-shadow [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                            <div className="flex justify-center items-center w-5 h-6 bg-trait-icon-bg [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                              <img
                                src="/img/trait/Trait_Icon_13_Academy.TFT_Set13.png"
                                alt="icon"
                                className="w-3 h-3"
                              />
                            </div>
                          </div>
                          <p className="text-lg text-text-white text-left">
                            戰爭學院
                          </p>
                        </div>
                        <div className="flex flex-row">
                          <div className="w-fit h-fit p-[1px] mr-1 bg-trait-icon-shadow [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                            <div className="flex justify-center items-center w-5 h-6 bg-trait-icon-bg [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                              <img
                                src="/img/trait/Trait_Icon_13_Sorcerer.TFT_Set13.png"
                                alt="icon"
                                className="w-3 h-3 border-4"
                              />
                            </div>
                          </div>
                          <p className="text-lg text-text-white text-left">
                            巫師
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center px-2 bg-linear-to-r from-one-cost-card-dark to-one-cost-card-light grow">
                      <p className="text-xl text-text-white">拉克斯</p>
                      <p className="flex items-center justify-start text-lg text-text-white font-light font-sans leading-none">
                        <img
                          className="w-4 h-4 mr-2 mt-1"
                          src="/img/item/Gold.png"
                          alt="icon"
                        />
                        1
                      </p>
                    </div>
                  </>
                );
                break;
              case 2:
                body = (
                  <>
                    <div className="relative border-2 border-two-cost-card-light">
                      <div className="border border-card-border">
                        <img
                          className="w-full aspect-[69/40]"
                          src="/img/champion/TFT13_RenataGlasc.TFT_Set13.png"
                          alt="champion"
                          />
                      </div>
                      <div className="absolute top-0 left-0 flex flex-col justify-end pl-1 w-full h-full">
                        <div className="flex flex-row">
                          <div className="w-fit h-fit p-[1px] mr-1 bg-trait-icon-shadow [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                            <div className="flex justify-center items-center w-5 h-6 bg-trait-icon-bg [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                              <img
                                src="/img/trait/Trait_Icon_13_Academy.TFT_Set13.png"
                                alt="icon"
                                className="w-3 h-3"
                              />
                            </div>
                          </div>
                          <p className="text-lg text-text-white text-left">
                            戰爭學院
                          </p>
                        </div>
                        <div className="flex flex-row">
                          <div className="w-fit h-fit p-[1px] mr-1 bg-trait-icon-shadow [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                            <div className="flex justify-center items-center w-5 h-6 bg-trait-icon-bg [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                              <img
                                src="/img/trait/Trait_Icon_13_Sorcerer.TFT_Set13.png"
                                alt="icon"
                                className="w-3 h-3"
                              />
                            </div>
                          </div>
                          <p className="text-lg text-text-white text-left">
                            巫師
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center px-2 bg-linear-to-r from-two-cost-card-dark to-two-cost-card-light grow">
                      <p className="text-xl text-text-white">
                        睿娜妲．格萊斯克
                      </p>
                      <p className="flex items-center justify-start text-lg text-text-white font-light font-sans leading-none">
                        <img
                          className="w-4 h-4 mr-2 mt-1"
                          src="/img/item/Gold.png"
                          alt="icon"
                        />
                        2
                      </p>
                    </div>
                  </>
                );
                break;
              case 3:
                body = (
                  <>
                    <div className="relative border-2 border-three-cost-card-light">
                      <div className="border border-card-border">
                        <img
                          className="w-full aspect-[69/40]"
                          src="/img/champion/TFT13_Blitzcrank.TFT_Set13.png"
                          alt="champion"
                        />
                      </div>
                      <div className="absolute top-0 left-0 flex flex-col justify-end pl-1 w-full h-full">
                        <div className="flex flex-row">
                          <div className="w-fit h-fit p-[1px] mr-1 bg-trait-icon-shadow [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                            <div className="flex justify-center items-center w-5 h-6 bg-trait-icon-bg [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                              <img
                                src="/img/trait/Trait_Icon_13_Academy.TFT_Set13.png"
                                alt="icon"
                                className="w-3 h-3"
                              />
                            </div>
                          </div>
                          <p className="text-lg text-text-white text-left">
                            戰爭學院
                          </p>
                        </div>
                        <div className="flex flex-row">
                          <div className="w-fit h-fit p-[1px] mr-1 bg-trait-icon-shadow [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                            <div className="flex justify-center items-center w-5 h-6 bg-trait-icon-bg [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                              <img
                                src="/img/trait/Trait_Icon_13_Sorcerer.TFT_Set13.png"
                                alt="icon"
                                className="w-3 h-3"
                              />
                            </div>
                          </div>
                          <p className="text-lg text-text-white text-left">
                            巫師
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center px-2 bg-linear-to-r from-three-cost-card-dark to-three-cost-card-light grow">
                      <p className="text-xl text-text-white">布里茨</p>
                      <p className="flex items-center justify-start text-lg text-text-white font-light font-sans leading-none">
                        <img
                          className="w-4 h-4 mr-2 mt-1"
                          src="/img/item/Gold.png"
                          alt="icon"
                        />
                        3
                      </p>
                    </div>
                  </>
                );
                break;
              case 4:
                body = (
                  <>
                    <div className="relative border-2 border-four-cost-card-light">
                      <div className="border border-card-border">
                        <img
                          className="w-full aspect-[69/40]"
                          src="/img/champion/TFT13_Silco.TFT_Set13.png"
                          alt="champion"
                        />
                      </div>
                      <div className="absolute top-0 left-0 flex flex-col justify-end pl-1 w-full h-full">
                        <div className="flex flex-row">
                          <div className="w-fit h-fit p-[1px] mr-1 bg-trait-icon-shadow [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                            <div className="flex justify-center items-center w-5 h-6 bg-trait-icon-bg [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                              <img
                                src="/img/trait/Trait_Icon_13_Academy.TFT_Set13.png"
                                alt="icon"
                                className="w-3 h-3"
                              />
                            </div>
                          </div>
                          <p className="text-lg text-text-white text-left">
                            戰爭學院
                          </p>
                        </div>
                        <div className="flex flex-row">
                          <div className="w-fit h-fit p-[1px] mr-1 bg-trait-icon-shadow [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                            <div className="flex justify-center items-center w-5 h-6 bg-trait-icon-bg [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                              <img
                                src="/img/trait/Trait_Icon_13_Sorcerer.TFT_Set13.png"
                                alt="icon"
                                className="w-3 h-3"
                              />
                            </div>
                          </div>
                          <p className="text-lg text-text-white text-left">
                            巫師
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center px-2 bg-linear-to-r from-four-cost-card-dark to-four-cost-card-light grow">
                      <p className="text-xl text-text-white">希爾科</p>
                      <p className="flex items-center justify-start text-lg text-text-white font-light font-sans leading-none">
                        <img
                          className="w-4 h-4 mr-2 mt-1"
                          src="/img/item/Gold.png"
                          alt="icon"
                        />
                        4
                      </p>
                    </div>
                  </>
                );
                break;
              case 5:
                body = (
                  <>
                    <div className="relative border-2 border-five-cost-card-light">
                      <div className="border border-card-border">
                        <img
                          className="w-full aspect-[69/40]"
                          src="/img/champion/TFT13_Rumble.TFT_Set13.png"
                          alt="champion"
                        />
                      </div>
                      <div className="absolute top-0 left-0 flex flex-col justify-end pl-1 w-full h-full">
                        <div className="flex flex-row">
                          <div className="w-fit h-fit p-[1px] mr-1 bg-trait-icon-shadow [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                            <div className="flex justify-center items-center w-5 h-6 bg-trait-icon-bg [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                              <img
                                src="/img/trait/Trait_Icon_13_Academy.TFT_Set13.png"
                                alt="icon"
                                className="w-3 h-3"
                              />
                            </div>
                          </div>
                          <p className="text-lg text-text-white text-left">
                            戰爭學院
                          </p>
                        </div>
                        <div className="flex flex-row">
                          <div className="w-fit h-fit p-[1px] mr-1 bg-trait-icon-shadow [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                            <div className="flex justify-center items-center w-5 h-6 bg-trait-icon-bg [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
                              <img
                                src="/img/trait/Trait_Icon_13_Sorcerer.TFT_Set13.png"
                                alt="icon"
                                className="w-3 h-3"
                              />
                            </div>
                          </div>
                          <p className="text-lg text-text-white text-left">
                            巫師
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center px-2 bg-linear-to-r from-five-cost-card-dark to-five-cost-card-light grow">
                      <p className="text-xl text-text-white">藍寶</p>
                      <p className="flex items-center justify-start text-lg text-text-white font-light font-sans leading-none">
                        <img
                          className="w-4 h-4 mr-2 mt-1"
                          src="/img/item/Gold.png"
                          alt="icon"
                        />
                        5
                      </p>
                    </div>
                  </>
                );
                break;
            }

            return (
              <div
                className="flex flex-col h-full p-1 bg-bg-black border hover:opacity-90 hover:cursor-pointer transition-opacity duration-150"
                key={item}
              >
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Shop