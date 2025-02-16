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
                className={`relative border-3 border-${cost}-cost-card-light`}
                onMouseEnter={() =>
                  setHoverCard({
                    index: index,
                    tier: item.tier,
                    star: 1,
                  })
                }
                onMouseLeave={() => setHoverCard(null)}
                title="出售英雄(E)"
              >
                <p className="absolute left-0 bottom-0 w-full pb-1 pl-1 text-white text-lg text-shadow whitespace-nowrap overflow-hidden pointer-events-none">
                  {item.name}
                </p>
                <img
                  className="h-20 hover:cursor-pointer"
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
}

export default Seat