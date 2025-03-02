const Seat = ({ seat, setHoverCard }) => {

  return (
    <div className="flex flex-row items-center justify-center gap-0.5 w-fit h-fit ml-22 mb-4 border-2 border-bg-black bg-bg-black/30">
      {seat.map((item, index) => {
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
        return (
          <div
            className="w-25.5 h-25.5 bg-seat-bg p-2 hover:opacity-80"
            key={index}
          >
            {item.name && (
              <div
                className={`relative w-full h-full border-3 border-${cost}-cost-card-light`}
                onMouseEnter={() =>
                  setHoverCard({
                    index: index,
                    tier: item.tier,
                    star: item.star,
                    name: item.name,
                    id: item.id,
                  })
                }
                onMouseLeave={() => setHoverCard(null)}
                title="出售英雄(E)"
              >
                {item.star === 2 && (
                  <>
                    <div className="absolute top-0 left-0 right-0 flex flex-row justify-center gap-0.5 pt-2 pointer-events-none">
                      {[1, 2].map((item) => {
                        return (
                          <img
                            src="/img/svg/twoStar.svg"
                            alt="starIcon"
                            className="drop-shadow-black"
                            key={item}
                          />
                        );
                      })}
                    </div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-two-star-light animate-level-up opacity-0"></div>
                  </>
                )}
                {item.star === 3 && (
                  <>
                    <div className="absolute top-0 left-0 right-0 flex flex-row justify-center gap-0.5 pt-2 pointer-events-none">
                      {[1, 2, 3].map((item) => {
                        return (
                          <img
                            src="/img/svg/threeStar.svg"
                            alt="starIcon"
                            className="drop-shadow-black"
                            key={item}
                          />
                        );
                      })}
                    </div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-three-star-light animate-level-up opacity-0"></div>
                  </>
                )}
                <p className="absolute left-0 bottom-0 w-full pb-1 text-white text-lg whitespace-nowrap overflow-hidden pointer-events-none text-shadow">
                  {item.name}
                </p>
                <img
                  className="hover:cursor-pointer"
                  src={`/img/face/${item.id}.avif`}
                  alt="champion"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Seat