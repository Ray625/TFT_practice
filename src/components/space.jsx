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
        width="70"
        height="86"
        viewBox="0 0 96 100"
      >
        <defs>
          <clipPath id="hexClip">
            <path d="M48 0 L 96 25 L 96 75 L48 100 L 0 75 L 0 25 Z" />
          </clipPath>
        </defs>
        {!cardData.name && (
          <path
            d="M48 0 L 96 25 L 96 75 L48 100 L 0 75 L 0 25 Z"
            style={{ fill: `var(--color-bg-black)` }}
          />
        )}
        {cardData.name && (
          <>
            <g clipPath="url(#hexClip)">
              <image
                x="0"
                y="0"
                width="96"
                height="100"
                preserveAspectRatio="xMidYMid slice"
                href={`/img/face/${cardData.id}.avif`}
              />
            </g>
            <path
              d="M48 0 L94 25 L94 75 L48 100 L2 75 L2 25 Z"
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
                  viewBox="0 0 96 100"
                  width="18"
                  height="18"
                  key={traitName}
                >
                  <rect
                    width="96"
                    height="100"
                    style={{ fill: "var(--color-trait-bg)" }}
                    clipPath="url(#hexClip)"
                  />
                  <image
                    x="7.2"
                    y="7.5"
                    width="81.6"
                    height="85"
                    preserveAspectRatio="xMidYMid slice"
                    href={`/img/trait/${traitData.image.full}`}
                    clipPath="url(#hexClip)"
                  />
                  <path
                    d="M48 4 L90 27 L90 73 L48 96 L6 73 L6 27 Z"
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
                      src="/img/svg/twoStar.svg"
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
                      src="/img/svg/threeStar.svg"
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

const Space = ({ spaceList }) => {
  return (
    <div className="flex flex-col w-fit h-fit mb-8 p-8 bg-seat-bg">
      <div className="flex flex-row gap-2">
        {spaceList.slice(0, 7).map((item, index) => {
          return (
            <div key={index}>
              <OneGrid cardData={item} />
            </div>
          );
        })}
      </div>
      <div className="flex flex-row gap-2 ml-10.25">
        {spaceList.slice(7, 14).map((item, index) => {
          return (
            <div key={index}>
              <OneGrid cardData={item} />
            </div>
          );
        })}
      </div>
      <div className="flex flex-row gap-2">
        {spaceList.slice(14, 21).map((item, index) => {
          return (
            <div key={index}>
              <OneGrid cardData={item} />
            </div>
          );
        })}
      </div>
      <div className="flex flex-row gap-2 ml-10.25">
        {spaceList.slice(21, 28).map((item, index) => {
          return (
            <div key={index}>
              <OneGrid cardData={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Space;
