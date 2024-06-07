import { sampleChar } from "@/assets";
import Image from "next/image";

export default function Info() {
  const mainColor = "#92BB77";
  const userName = "テリー伊藤";
  const personalChara = "山の好奇心旺盛なコンサルタント";
  const catchTitle =
    "「山の好奇心旺盛なコンサルタント、知識の泉で未来を切り開く！学び続ける探求者の旅は終わらない！」";
  return (
    <div className="mx-auto max-w-[450px] w-full flex flex-col items-center  min-h-[100svh]">
      <div
        className="w-[95%] mx-auto flex flex-col gap-4 bg-white rounded-br-[20px] rounded-bl-[20px] min-h-[460px] overflow-hidden relative"
        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div
          className="w-full flex flex-col items-center gap-5"
          style={{ borderTop: `8px solid ${mainColor}` }}
        >
          <h1 className="text-[18px] text-black font-bold text-center mt-10">
            {userName}さんのnative.card
          </h1>
          <Image alt="" src={sampleChar} width={140} style={{ zIndex: 1 }} />
          <div className="flex flex-col gap-1 mt-2">
            <p
              style={{ color: mainColor }}
              className="text-[14px] text-center font-semibold"
            >
              {personalChara}
            </p>
            <p
              style={{ color: mainColor }}
              className="text-[28px] text-center font-bold"
            >
              MtC-
            </p>
            <p className="text-[14px] text-black font-semibold text-center w-[90%] m-auto mb-5">
              {catchTitle}
            </p>
          </div>
          <div
            style={{ background: mainColor, opacity: 0.3 }}
            className="w-[660px] h-[708px] rounded-[860px] absolute bottom-[-516px] z-0"
          />
        </div>
      </div>
    </div>
  );
}
