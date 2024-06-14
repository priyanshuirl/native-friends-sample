"use client";
import { logo } from "@/assets/brand";
import {
  facebookIcon,
  instagramIcon,
  lineIcon,
  shareIcon,
  xIcon,
} from "@/assets/social";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { Tooltip } from "react-tooltip";
//@ts-ignore
import { CircleProgress } from "react-gradient-progress";

function addAlpha(color: string, opacity: number) {
  var _opacity = Math.round(Math.min(Math.max(opacity ?? 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}

const WhiteCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-[95%] mx-auto flex flex-col gap-2 bg-white rounded-[20px] overflow-hidden"
      style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      {children}
    </div>
  );
};

const SectionTitleBlack = ({ children }: { children: React.ReactNode }) => (
  <p
    className="text-black text-center font-semibold text-[16px] my-2"
    dangerouslySetInnerHTML={{ __html: children as any }}
  />
);

const SectionText = ({
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

export default function Compatibility() {
  const searchParams = useSearchParams();
  const [selfData, setSelfData] = useState<any>();
  const [referrerData, setReferrerData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [compatibilityData, setCompatibilityData] = useState<any>();

  const selfUsername = searchParams.get("self-name");
  const referrerUsername = decodeURIComponent(
    `${searchParams.get("referrer-name")}`
  );

  const fetchData = async () => {
    setIsLoading(true);
    const apiResponseSelf = await fetch(
      `https://card.stg.be-native.life:8443/friends/friends_data/${`${
        searchParams.get("self-dob")?.split("-")?.[0]
      }`}/${`${searchParams.get("self-dob")?.split("-")?.[1]}`}/${`${
        searchParams.get("self-dob")?.split("-")?.[2]
      }`}`
    );
    const apiDataSelf = await apiResponseSelf.json();
    const apiResponseReferrer = await fetch(
      `https://card.stg.be-native.life:8443/friends/friends_data/${`${
        searchParams.get("referrer-dob")?.split("-")?.[0]
      }`}/${`${searchParams.get("referrer-dob")?.split("-")?.[1]}`}/${`${
        searchParams.get("referrer-dob")?.split("-")?.[2]
      }`}`
    );
    const apiDataReferrer = await apiResponseReferrer.json();
    const apiResponseCompatibility = await fetch(
      `https://card.stg.be-native.life:8443/friends/matchin_data/${`${
        searchParams.get("referrer-dob")?.split("-")?.[0]
      }`}/${`${searchParams.get("referrer-dob")?.split("-")?.[1]}`}/${`${
        searchParams.get("referrer-dob")?.split("-")?.[2]
      }`}/and/${`${searchParams.get("self-dob")?.split("-")?.[0]}`}/${`${
        searchParams.get("self-dob")?.split("-")?.[1]
      }`}/${`${searchParams.get("self-dob")?.split("-")?.[2]}`}`
    );
    const apiDataCompatibility = await apiResponseCompatibility.json();
    setCompatibilityData(apiDataCompatibility);
    setSelfData(apiDataSelf);
    setReferrerData(apiDataReferrer);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selfColor = selfData?.hex_color;
  const referrerColor = referrerData?.hex_color;

  const selfTitle = selfData?.param20;
  const referrerTitle = referrerData?.param20;

  const selfOneLiner = selfData?.param2;
  const referrerOneLiner = referrerData?.param2;

  const selfType = selfData?.param1;
  const referrerType = referrerData?.param1;

  const compatibilityText = compatibilityData?.text_data;

  const selfCard1Text = selfData?.param21;
  const referrerCard1Text = referrerData?.param21;

  const selfCard2Text = selfData?.param22;
  const referrerCard2Text = referrerData?.param22;

  const selfCard3Text = selfData?.param23;
  const referrerCard3Text = referrerData?.param23;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return isLoading ? (
    <div className="min-h-[100svh] w-full flex flex-col items-center justify-center gap-2">
      <p className="text-[24px] font-bold text-neutral-800">読み込み中...</p>
    </div>
  ) : (
    <div className="mx-auto max-w-[450px] w-full flex flex-col items-center gap-10 min-h-[100svh] pb-10">
      <div
        className="w-[95%] mx-auto flex flex-col gap-4 bg-white rounded-br-[20px] rounded-bl-[20px] min-h-[460px] overflow-hidden relative"
        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="w-full flex flex-col items-center gap-5 mt-5 mb-2">
          <div className="flex flex-row items-center gap-2 justify-center">
            <div className="bg-black h-[1px] w-10" />
            <p className="text-black text-[24px] font-semibold">
              native.相性診断結果
            </p>
            <div className="bg-black h-[1px] w-10" />
          </div>
        </div>
        {/* Section One */}
        <div className="w-full grid grid-cols-2 relative">
          <div
            className="absolute top-[50%] left-[50%] w-[110px]"
            style={{ transform: "translate(-68%,-40%)" }}
          >
            <CircleProgress
              percentage={compatibilityData?.score}
              strokeWidth={14}
              width={150}
              primaryColor={["#B69EC6", "#A6C1EA"]}
              secondaryColor="#E5E5E5"
            />
            <div
              style={{ fontSize: 12 }}
              className="bg-white w-[82px] h-[82px] rounded-full flex flex-col items-center justify-center absolute top-[35px] left-[34px]"
            >
              <p className="text-black font-semibold text-center text-[8px] w-[40px]">
                ふたりのフィット感
              </p>
              <p className="text-center text-[#EC736E] text-[22px] font-extrabold">
                {compatibilityData?.score}%
              </p>
            </div>
          </div>
          <div
            className="w-full flex flex-col gap-3 items-center px-5 pb-5"
            style={{
              borderTop: `8px solid ${selfColor}`,
              background: addAlpha(selfColor, 0.2),
            }}
          >
            <p className="text-black text-center font-semibold text-[16px] mt-2">
              {selfUsername}さんの
              <br />
              native.card
            </p>
            <p
              className="text-[14px] font-semibold h-[60px]"
              style={{ color: selfColor }}
            >
              {selfTitle}
            </p>
            <div className="w-full flex flex-col items-start">
              <Image
                alt=""
                src={`https://card.stg.be-native.life:8443/friends/charimg/${selfType}`}
                width={120}
                height={120}
                style={{ zIndex: 1 }}
              />
            </div>
            <p className="text-[14px] text-center font-semibold text-black">
              {selfOneLiner}
            </p>
            <p className="text-[24px] text-center font-semibold text-black">
              {selfType}
            </p>
          </div>
          <div
            className="w-full flex flex-col gap-3 items-center px-5 pb-5"
            style={{
              borderTop: `8px solid ${referrerColor}`,
              background: addAlpha(referrerColor, 0.2),
            }}
          >
            <p className="text-black text-center font-semibold text-[16px] mt-2">
              {referrerUsername}さんの
              <br />
              native.card
            </p>
            <p
              className="text-[14px] font-semibold  h-[60px]"
              style={{ color: referrerColor }}
            >
              {referrerTitle}
            </p>
            <div className="w-full flex flex-col items-end">
              <Image
                alt=""
                src={`https://card.stg.be-native.life:8443/friends/charimg/${referrerType}`}
                width={120}
                height={120}
                style={{ zIndex: 1 }}
              />
            </div>
            <p className="text-[14px] text-center font-semibold text-black">
              {referrerOneLiner}
            </p>
            <p className="text-[24px] text-center font-semibold text-black">
              {referrerType}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center mx-auto w-[80%] mb-5 mt-2">
          <SectionText thin>{compatibilityText}</SectionText>
        </div>
      </div>
      <p className="text-black text-[18px] font-semibold">
        仲良しになるための3つのポイント
      </p>
      {/* Card One */}
      <WhiteCard>
        <SectionTitleBlack>1.コミュニケーションタイプ</SectionTitleBlack>
        <div className="grid grid-cols-2">
          <div
            className="w-full flex flex-col gap-3 items-center px-5 pt-5 pb-5"
            style={{
              background: addAlpha(selfColor, 0.2),
              borderRight: "0.5px solid black",
            }}
          >
            <SectionText>{selfCard1Text}</SectionText>
          </div>
          <div
            className="w-full flex flex-col gap-3 items-center px-5 pt-5 pb-5"
            style={{
              background: addAlpha(referrerColor, 0.2),
            }}
          >
            <SectionText>{referrerCard1Text}</SectionText>
          </div>
        </div>
      </WhiteCard>

      {/* Card Two */}
      <WhiteCard>
        <SectionTitleBlack>2.不機嫌になるパターン</SectionTitleBlack>
        <div className="grid grid-cols-2">
          <div
            className="w-full flex flex-col gap-3 items-center px-5 pt-5 pb-5"
            style={{
              background: addAlpha(selfColor, 0.2),
              borderRight: "0.5px solid black",
            }}
          >
            <SectionText>{selfCard2Text}</SectionText>
          </div>
          <div
            className="w-full flex flex-col gap-3 items-center px-5 pt-5 pb-5"
            style={{
              background: addAlpha(referrerColor, 0.2),
            }}
          >
            <SectionText>{referrerCard2Text}</SectionText>
          </div>
        </div>
      </WhiteCard>

      {/* Card Three */}
      <WhiteCard>
        <SectionTitleBlack>3.ふたりが好きな遊び</SectionTitleBlack>
        <div className="grid grid-cols-2">
          <div
            className="w-full flex flex-col gap-3 items-center px-5 pt-5 pb-5"
            style={{
              background: addAlpha(selfColor, 0.2),
              borderRight: "0.5px solid black",
            }}
          >
            <SectionText>{selfCard3Text}</SectionText>
          </div>
          <div
            className="w-full flex flex-col gap-3 items-center px-5 pt-5 pb-5"
            style={{
              background: addAlpha(referrerColor, 0.2),
            }}
          >
            <SectionText>{referrerCard3Text}</SectionText>
          </div>
        </div>
      </WhiteCard>

      {/* Card Six */}
      <WhiteCard>
        <div className="h-2" />
        <p className="text-black text-center font-semibold text-[16px]">
          native.をSNSでシェア、相性診断
        </p>
        <div className="mt-2 flex w-full flex-row justify-center gap-3 items-center mb-2">
          <div
            className="w-[55px] aspect-square flex items-center justify-center rounded-[12px]"
            style={{ border: "0.6px solid #000" }}
            onClick={() =>
              window.open(
                `https://twitter.com/share?text=${`生年月日入力のみで、自分の可能性が拓ける ${`${encodeURIComponent(
                  `${selfUsername}`
                )}`} native. card｜1秒自己探索アイテム「native.」@benative14`}&url=${encodeURIComponent(
                  window.location.href
                )}&hashtags=native.,#nativeで繋がろう,MBTI`
              )
            }
          >
            <Image alt="" src={xIcon} width={30} style={{ zIndex: 1 }} />
          </div>

          {/* <div
            className="w-[55px] aspect-square flex items-center justify-center rounded-[12px]"
            style={{ border: "0.6px solid #000" }}
          >
            <Image
              alt=""
              src={instagramIcon}
              width={30}
              style={{ zIndex: 1 }}
            />
          </div> */}
          {/* <div
            className="w-[55px] aspect-square flex items-center justify-center rounded-[12px]"
            style={{ border: "0.6px solid #000" }}
          >
            <Image alt="" src={lineIcon} width={30} style={{ zIndex: 1 }} />
          </div> */}
          {/* <div
            className="w-[55px] aspect-square flex items-center justify-center rounded-[12px]"
            style={{ border: "0.6px solid #000" }}
          >
            <Image alt="" src={facebookIcon} width={30} style={{ zIndex: 1 }} />
          </div> */}
          <Tooltip id="copied-to-clipboard-tooltip">コピーしました！</Tooltip>
          <div
            data-tooltip-id="copied-to-clipboard-tooltip"
            className="w-[55px] aspect-square flex items-center justify-center rounded-[12px]"
            style={{ border: "0.6px solid #000" }}
            onClick={handleCopyLink}
            onMouseEnter={handleCopyLink}
          >
            <Image alt="" src={shareIcon} width={30} style={{ zIndex: 1 }} />
          </div>
        </div>
        <div className="h-2" />
      </WhiteCard>

      {/* Footer */}
      <div className="flex flex-col gap-5 items-center">
        <div className="flex flex-col items-center mt-2 mb-1">
          <Image alt="" src={logo} width={150} style={{ zIndex: 1 }} />
        </div>
        <p className="text-center text-[8px] text-[#A1A1AA]">
          © 2024 native.K.K All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
