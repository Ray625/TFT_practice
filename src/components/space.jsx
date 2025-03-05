import trait from "../assets/tft-trait-set13.json";

const OneGrid = ({ cardData }) => {
  let cost;
  switch (cardData?.tier) {
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
  }

  return (
    <div className="relative flex justify-center w-fit aspect-13/15 hover:opacity-80">
      <svg
        version="1.1"
        baseProfile="full"
        xmlns="http://www.w3.org/2000/svg"
        width="78"
        height="90"
        viewBox="0 0 88 100"
      >
        <defs>
          <clipPath id="hexClip">
            <path d="M44 0 L 88 25 L 88 75 L44 100 L 0 75 L 0 25 Z" />
          </clipPath>
        </defs>
        {!cardData.name && (
          <path
            d="M44 0 L 88 25 L 88 75 L44 100 L 0 75 L 0 25 Z"
            style={{ fill: `var(--color-bg-black)` }}
          />
        )}
        {cardData.name && (
          <>
            <g clipPath="url(#hexClip)">
              <image
                x="0"
                y="0"
                width="88"
                height="100"
                preserveAspectRatio="xMidYMid slice"
                href={`img/face/${cardData.id}.avif`}
              />
            </g>
            <path
              d="M44 2 L86 26 L86 74 L44 98 L2 74 L2 26 Z"
              strokeWidth="4px"
              fill="none"
              style={{ stroke: `var(--color-${cost}-cost-card-light)` }}
            />
          </>
        )}
      </svg>
      {cardData.name && (
        <>
          <div className="absolute z-10 flex flex-row gap-0.5 top-0 left-0 justify-center w-full pt-1.5">
            {cardData.trait.map((traitName) => {
              const traitData = trait.data[`TFT13_${traitName}`];
              return (
                <svg
                  version="1.1"
                  baseProfile="full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 88 100"
                  width="15.6"
                  height="18"
                  key={traitName}
                >
                  <rect
                    width="88"
                    height="100"
                    style={{ fill: "var(--color-trait-bg)" }}
                    clipPath="url(#hexClip)"
                  />
                  <image
                    x="8.8"
                    y="10"
                    width="70.4"
                    height="80"
                    preserveAspectRatio="xMidYMid slice"
                    href={`img/trait/${traitData.image.full}`}
                    clipPath="url(#hexClip)"
                  />
                  <path
                    d="M44 4 L84 27 L84 73 L44 96 L4 73 L4 27 Z"
                    strokeWidth="4px"
                    fill="none"
                    style={{ stroke: "var(--color-trait-border)" }}
                  />
                </svg>
              );
            })}
          </div>

          {cardData.star === 2 && (
            <>
              <div className="absolute top-0 left-0 right-0 flex flex-row justify-center gap-0.5 pt-7 pointer-events-none scale-75">
                {[1, 2].map((item) => {
                  return (
                    <img
                      src="img/svg/twoStar.svg"
                      alt="starIcon"
                      className="drop-shadow-black"
                      key={item}
                    />
                  );
                })}
              </div>
            </>
          )}
          {cardData.star === 3 && (
            <>
              <div className="absolute top-0 left-0 right-0 flex flex-row justify-center gap-0.5 pt-7 pointer-events-none scale-75">
                {[1, 2, 3].map((item) => {
                  return (
                    <img
                      src="img/svg/threeStar.svg"
                      alt="starIcon"
                      className="drop-shadow-black"
                      key={item}
                    />
                  );
                })}
              </div>
            </>
          )}
          <p className="absolute flex justify-center items-end z-10 min-w-full w-fit h-full pb-5 text-white text-sm whitespace-nowrap pointer-events-none text-shadow">
            {cardData.name}
          </p>
        </>
      )}
    </div>
  );
};

const Space = ({ space, setHoverCard, spaceAnimate }) => {
  return (
    <div className="flex flex-col w-fit h-fit mb-8 p-8 bg-seat-bg">
      {Array.from({ length: 4 }, (_, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex flex-row gap-2 ${
            rowIndex % 2 === 1 ? "ml-10.75" : ""
          }`}
        >
          {space
            .slice(rowIndex * 7, rowIndex * 7 + 7)
            .map((item, index) => {
              return Object.keys(item).length !== 0 ? (
                <div
                  key={rowIndex * 7 + index}
                  onMouseEnter={() =>
                    setHoverCard({
                      place: "space",
                      index: rowIndex * 7 + index,
                      cardData: item,
                    })
                  }
                  onMouseLeave={() => setHoverCard(null)}
                  className="relative"
                >
                  <OneGrid cardData={item} />
                  {spaceAnimate.has(rowIndex * 7 + index) &&
                    spaceAnimate.get(index) === 2 && (
                      <div className="absolute top-0 left-0 right-0 bottom-0">
                        <img
                          src="img/svg/twoStarsUp.svg"
                          alt="animate"
                          className="animate-level-up opacity-0 pointer-events-none select-none"
                        />
                      </div>
                    )}
                  {spaceAnimate.has(rowIndex * 7 + index) &&
                    spaceAnimate.get(index) === 3 && (
                      <div className="absolute top-0 left-0 right-0 bottom-0">
                        <img
                          src="img/svg/threeStarsUp.svg"
                          alt="animate"
                          className="animate-level-up opacity-0 pointer-events-none select-none"
                        />
                      </div>
                    )}
                </div>
              ) : (
                <div key={rowIndex * 7 + index}>
                  <OneGrid cardData={item} />
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default Space;
