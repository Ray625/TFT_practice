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
          default:
            cost = null;
        }

  return (
    <div className="relative flex justify-center w-fit aspect-13/15 hover:opacity-80">
      <svg
        version="1.1"
        baseProfile="full"
        xmlns="http://www.w3.org/2000/svg"
        width="74"
        height="86"
        viewBox="0 0 78 86"
      >
        <defs>
          <clipPath id="hexClip">
            <path
              d="M39 0 L 76 21.5 L 76 64.5 L39 86 L 2 64.5 L 2 21.5 Z"
            />
          </clipPath>
        </defs>
        {!cardData.name && (
          <path
            d="M39 0 L 76 21.5 L 76 64.5 L39 86 L 2 64.5 L 2 21.5 Z"
            style={{fill: `var(--color-bg-black)`}}
          />
        )}
        {cardData.name && (
          <>
          <g clipPath="url(#hexClip)">
            <image
              x="0"
              y="0"
              width="74"
              height="86"
              preserveAspectRatio="xMidYMid slice"
              href={`/img/face/${cardData.id}.avif`}
              />
          </g>
          <path
              d="M39 0 L 76 21.5 L 76 64.5 L39 86 L 2 64.5 L 2 21.5 Z"
              strokeWidth="4px"
              fill="none"
              style={{stroke: `var(--color-${cost}-cost-card-light)`}}
              />
          </>
        )}
      </svg>
      {/* {cardData.name && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center">
          <div
            className={`absolute flex w-full h-full p-1 bg-${cost}-cost-card-light [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]`}
          >
            <div className="relative flex justify-center items-center w-full aspect-13/15 [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
              <img
                className="absolute w-[76px] h-auto max-w-fit hover:cursor-pointer"
                src={`/img/face/${cardData.id}.avif`}
                alt="champion"
              />
            </div>
          </div>
          <p className="relative flex justify-center items-end z-10 min-w-full w-fit h-full pb-6 text-white text-sm whitespace-nowrap pointer-events-none text-shadow">
            {cardData.name}
          </p>
        </div>
      )} */}
    </div>
  );
}

const Space = ({spaceList}) => {
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
}

export default Space