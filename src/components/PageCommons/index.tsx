export const WhiteCard = ({
  children,
  noPadding = false,
}: {
  children: React.ReactNode;
  noPadding?: boolean;
}) => {
  return (
    <div
      className="w-[95%] mx-auto flex flex-col gap-2 bg-white rounded-[20px] overflow-hidden  pb-6"
      style={{
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        padding: noPadding ? "0px" : "16px",
      }}
    >
      {children}
    </div>
  );
};

export const RedSectionTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <p className="text-[#EC736E] text-center font-semibold text-[14px]">
    {children}
  </p>
);

export const GoldenSectionTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <p className="text-[#E6B422] text-center font-semibold text-[16px]">
    {children}
  </p>
);

export const HorizontalLine = () => (
  <div className="h-[0.4px] w-full bg-black" />
);

export const SectionText = ({
  children,
  align = "center",
  thin = false,
}: {
  children: React.ReactNode;
  align?: "center" | "left";
  thin?: boolean;
}) => {
  if ((children as string)?.includes("<br/>")) {
    return (children as string)?.split("<br/>")?.map((content, index) => {
      return index % 2 === 0 ? (
        <b>
          <p
            className="text-black font-bold text-[16px] my-1"
            style={{ textAlign: align }}
            dangerouslySetInnerHTML={{ __html: content as any }}
          />
        </b>
      ) : (
        <p
          className="text-black text-left  font-normal text-[12px]"
          dangerouslySetInnerHTML={{ __html: content as any }}
        />
      );
    });
  } else {
    return (
      <p
        className="text-black  text-[12px]"
        style={{ textAlign: align, fontWeight: thin ? 400 : 600 }}
        dangerouslySetInnerHTML={{ __html: children as any }}
      />
    );
  }
};

export const ColouredProgressIndicator = ({
  color,
  endIndicator,
  percentage,
  startIndicator,
  type,
}: {
  percentage: number;
  color: string;
  type: string;
  startIndicator: string;
  endIndicator: string;
}) => {
  const percentageToBeUsed = percentage > 100 ? 100 : percentage;
  const isRightAligned = type === startIndicator;
  return (
    <div className="w-[98%] flex flex-row items-center h-[56px] my-1 relative mx-auto">
      <p
        className="text-[10px] font-semibold min-w-[70px] left-0 top-10 absolute"
        style={{ color: startIndicator === type ? "#000" : "#AAA" }}
      >
        {startIndicator}
      </p>
      <div className="w-full relative">
        <div
          className=" absolute top-[-36px]"
          style={{
            [isRightAligned ? "right" : "left"]:
              type === "自己主張型"
                ? `calc(${percentageToBeUsed}% - 120px)`
                : percentage > 95
                ? `calc(${percentageToBeUsed}% - 100px)`
                : `calc(${percentageToBeUsed}% - 80px)`,
          }}
        >
          <p className="text-[14px] font-bold">
            <span style={{ color }}>{`${percentageToBeUsed}%`}</span> {type}
          </p>
        </div>
        <div
          className="w-[16px] h-[16px] rounded-full absolute top-[-2.5px] z-[1]"
          style={{
            [isRightAligned
              ? "right"
              : "left"]: `calc(${percentageToBeUsed}% - 20px)`,
            border: "2px solid #fff",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            background: color,
          }}
        />
        <div className="flex flex-row items-center h-[12px] bg-[#E5E5E5] rounded-full w-full overflow-hidden relative">
          <div
            className="h-full absolute"
            style={{
              width: `${100}%`,
              background: color,
              [isRightAligned ? "right" : "left"]: 0,
            }}
          />
        </div>
      </div>
      <p
        className="text-[10px] font-semibold min-w-[60px] text-right right-0 top-10 absolute"
        style={{ color: endIndicator === type ? "#000" : "#AAA" }}
      >
        {endIndicator}
      </p>
    </div>
  );
};
