"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  facebookIcon,
  instagramIcon,
  lineIcon,
  shareIcon,
  xIcon,
} from "@/assets/social";
import { logo } from "@/assets/brand";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";

const WhiteCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-[95%] mx-auto flex flex-col gap-2 bg-white rounded-[20px] py-3 px-4"
      style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      {children}
    </div>
  );
};

const RedSectionTitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[#EC736E] text-center font-semibold text-[14px]">
    {children}
  </p>
);

const GoldenSectionTitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[#E6B422] text-center font-semibold text-[16px]">
    {children}
  </p>
);

const HorizontalLine = () => <div className="h-[0.4px] w-full bg-black" />;

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

const ColouredProgressIndicator = ({
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
  return (
    <div className="w-full flex flex-row items-center h-[56px] my-1">
      <p
        className="text-[10px] font-semibold min-w-[70px] mt-10"
        style={{ color: startIndicator === type ? "#000" : "#AAA" }}
      >
        {startIndicator}
      </p>
      <div className="w-full relative">
        <div
          className=" absolute top-[-36px]"
          style={{
            left:
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
          className="w-[28px] h-[28px] rounded-full absolute top-[-7.7px]"
          style={{
            left: `calc(${percentageToBeUsed}% - 20px)`,
            background: color,
          }}
        />
        <div className="flex flex-row items-center h-[14px] bg-[#E5E5E5] rounded-full w-full overflow-hidden">
          <div
            className="h-full "
            style={{ width: `${percentageToBeUsed}%`, background: color }}
          />
        </div>
      </div>
      <p
        className="text-[10px] font-semibold min-w-[60px] mt-10 text-right"
        style={{ color: endIndicator === type ? "#000" : "#AAA" }}
      >
        {endIndicator}
      </p>
    </div>
  );
};

export default function InfoComponent({
  dob: { date, month, year },
  name,
  shared = false,
  isReferred = false,
  referrerName,
  referrerDOB,
}: {
  name: string;
  dob: { year: string; month: string; date: string };
  shared?: boolean;
  isReferred?: boolean;
  referrerName?: string;
  referrerDOB?: { year: string; month: string; date: string };
}) {
  const router = useRouter();
  const [isReadMoreHidden, setIsReadMoreHidden] = useState<boolean>(true);
  const [hideButton, setHideButton] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mtbiData, setMTBIData] = useState<any>();

  const handleReadMore = () => setIsReadMoreHidden((prev) => !prev);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isReadMoreHidden) {
        setHideButton(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [isReadMoreHidden]);

  const fetchData = async () => {
    setIsLoading(true);
    const apiResponse = await fetch(
      `https://card.stg.be-native.life:8443/friends/friends_data/${year}/${month}/${date}`
    );
    const apiData = await apiResponse.json();
    const mtbiAPIResponse = await fetch(
      `https://card.stg.be-native.life:8443/friends/get_MBTI_score/${year}/${month}/${date}`
    );
    const mtbiAPIData = await mtbiAPIResponse.json();
    setData(apiData);
    setMTBIData(mtbiAPIData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Top Card
  const mainColor = data?.hex_color;
  const userName = name;
  const userType = data?.param1;
  const personalChara = data?.param2;
  const catchTitle = data?.param3;

  // Card One
  const nativeScore = data?.native_score;

  // Card Two
  const personalHash1 = `#${data?.param4?.split("#")?.[1]}`;
  const personalHash2 = `#${data?.param4?.split("#")?.[2]}`;
  const personalHash3 = `#${data?.param4?.split("#")?.[3]}`;
  const personality1 = data?.param5;
  const kanji1 = `#${data?.param7?.split("#")?.[1]}`;
  const kanji2 = `#${data?.param7?.split("#")?.[2]}`;
  const kanji3 = `#${data?.param7?.split("#")?.[3]}`;

  // Card Three
  const motivationMoment1 = data?.param8;
  const demotivationMoment1 = data?.param10;

  // Card Four
  const fitChara1 = data?.partner_1;
  const fitChara1Hash1 = `#${data?.best_partner_hashtag1?.split("#")?.[1]}`;
  const fitChara1Hash2 = `#${data?.best_partner_hashtag1?.split("#")?.[2]}`;
  const fitChara1Title = data?.best_partner_text_1;

  const fitChara2 = data?.partner_2;
  const fitChara2Hash1 = `#${data?.best_partner_hashtag2?.split("#")?.[1]}`;
  const fitChara2Hash2 = `#${data?.best_partner_hashtag2?.split("#")?.[2]}`;
  const fitChara2Title = data?.best_partner_text_2;

  const getAlongScore1 =
    Number(nativeScore) - 5 < 3 ? 3 : Number(nativeScore) - 5;
  const getAlongScore2 =
    Number(nativeScore) + 5 > 36 ? 36 : Number(nativeScore) + 5;
  const secretGetAlong = data?.param12;

  //Card Five
  const card5Title = mtbiData?.mbti_type;
  const card5SubTitle = mtbiData?.mbti_tag;
  const percentage1 = Object.values(mtbiData?.param_1 ?? {})?.[0] as number;
  const percentage2 = Object.values(mtbiData?.param_2 ?? {})?.[0] as number;
  const percentage3 = Object.values(mtbiData?.param_3 ?? {})?.[0] as number;
  const percentage4 = Object.values(mtbiData?.param_4 ?? {})?.[0] as number;
  const percentage5 = Object.values(mtbiData?.param_5 ?? {})?.[0] as number;

  const getPercentageLabel = (key: string) => {
    switch (key) {
      case "E":
        return "外交型";
      case "I":
        return "内向型";
      case "S":
        return "直感型";
      case "N":
        return "観察型";
      case "T":
        return "思考型";
      case "F":
        return "感情型";
      case "J":
        return "計画型";
      case "P":
        return "探索型";
      case "A":
        return "自己主張型";
      case "B":
        return "慎重型";
    }
  };

  //Card Seven
  const personality2 = data?.param6;

  //Card Eight
  const motivationMoment2 = data?.param9;
  const demotivationMoment2 = data?.param11;

  //Card Nine
  const toreitsu1 = data?.param13;
  const toreitsu1Desc = data?.param14;
  const toreitsu2 = data?.param15;
  const toreitsu2Desc = data?.param16;
  const toreitsu3 = data?.param17;
  const toreitsu3Desc = data?.param18;

  const shareLink = `${window.location.origin}/info/share/${encodeURIComponent(
    name
  )}/${`${year}-${month}-${date}`}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  };

  const handleIssueInstantly = () => {
    router.push(
      `/?referrer-name=${encodeURIComponent(
        name
      )}&referrer-dob=${`${year}-${month}-${date}`}`
    );
  };

  const handleCompatible = () => {
    router.push(
      `/compatibility?referrer-name=${encodeURIComponent(
        `${referrerName}`
      )}&referrer-dob=${`${referrerDOB?.year}-${referrerDOB?.month}-${referrerDOB?.date}`}&self-name=${name}&self-dob=${`${year}-${month}-${date}`}`
    );
  };

  return isLoading ? (
    <div className="min-h-[100svh] w-full flex flex-col items-center justify-center gap-2">
      <p className="text-[24px] font-bold text-neutral-800">読み込み中...</p>
    </div>
  ) : (
    <div className="mx-auto max-w-[450px] w-full flex flex-col items-center gap-5 min-h-[100svh] pb-10">
      {shared ? (
        <button
          className="fixed bottom-0 left-[50%] text-[18px] bg-[#EC736E] text-white w-[200px] h-[50px] flex items-center justify-center rounded-[16px]"
          style={{ transform: "translate(-50%,-50%)", zIndex: 9 }}
          onClick={handleIssueInstantly}
        >
          今すぐ発行⁨⁩⁨⁩ ▶︎
        </button>
      ) : null}
      {/* Top Card */}
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
          <Image
            alt=""
            src={`https://card.stg.be-native.life:8443/friends/charimg/${userType}`}
            width={200}
            height={200}
            style={{ zIndex: 1 }}
          />
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
              {userType}
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

      {/* Card One */}
      <WhiteCard>
        <RedSectionTitle>あなたのnative. スコア</RedSectionTitle>
        <HorizontalLine />
        <div className="flex flex-row gap-4 items-start">
          <p className="text-[42px] font-bold" style={{ color: mainColor }}>
            {nativeScore}
          </p>
          <div className="w-full flex flex-col gap-2 mt-3">
            <div
              className="h-[12px] rounded-full overflow-hidden flex flex-row items-center relative"
              style={{
                background:
                  "linear-gradient(90deg, rgba(142,135,227,1) 0%, rgba(187,135,227,1) 35%, rgba(227,135,213,1) 100%)",
              }}
            >
              <div
                className="w-[15px] h-[15px] bg-[#EC736E] rounded-full absolute "
                style={{
                  border: "3px solid #fff",
                  left: `${(nativeScore / 36) * 100}%`,
                }}
              />
            </div>
            <div className="w-full grid grid-cols-3 gap-1">
              <div className="w-full flex flex-col gap-1 items-center">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="font-semibold text-[#aaa] text-[12px]">
                    3 (最小)
                  </p>
                  <p
                    className="font-semibold text-[#aaa] text-[12px] pr-1"
                    style={{ borderRight: "0.4px solid #aaa" }}
                  >
                    12
                  </p>
                </div>
                <p className="font-semibold text-[#aaa] text-[12px]">
                  研究者気質
                </p>
              </div>
              <div className="w-full flex flex-col gap-1 items-center">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="font-semibold text-[#aaa] text-[12px]"></p>
                  <p
                    className="font-semibold text-[#aaa] text-[12px] pr-1"
                    style={{ borderRight: "0.4px solid #aaa" }}
                  >
                    23
                  </p>
                </div>
                <p className="font-semibold text-[#aaa] text-[12px]">
                  管理職気質
                </p>
              </div>
              <div className="w-full flex flex-col gap-1 items-center">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="font-semibold text-[#aaa] text-[12px]"></p>
                  <p className="font-semibold text-[#aaa] text-[12px]">
                    (最大) 36
                  </p>
                </div>
                <p className="font-semibold text-[#aaa] text-[12px]">
                  起業家気質
                </p>
              </div>
            </div>
          </div>
        </div>
      </WhiteCard>

      {/* Card Two */}
      <WhiteCard>
        <RedSectionTitle>パーソナリティ</RedSectionTitle>
        <HorizontalLine />
        <div className="flex flex-row items-center justify-center gap-4">
          <SectionText>{personalHash1}</SectionText>
          <SectionText>{personalHash2}</SectionText>
          <SectionText>{personalHash3}</SectionText>
        </div>
        <SectionText>{personality1}</SectionText>
        <div className="h-5" />
        <RedSectionTitle>私を表す四字熟語</RedSectionTitle>
        <HorizontalLine />
        <div className="flex flex-row items-center justify-center gap-4">
          <SectionText>{kanji1}</SectionText>
          <SectionText>{kanji2}</SectionText>
          <SectionText>{kanji3}</SectionText>
        </div>
      </WhiteCard>

      {/* Card Three */}
      <WhiteCard>
        <RedSectionTitle>テンションUPする瞬間</RedSectionTitle>
        <HorizontalLine />
        <SectionText>{motivationMoment1}</SectionText>
        <div className="h-5" />
        <RedSectionTitle>テンションDOWNする瞬間</RedSectionTitle>
        <HorizontalLine />
        <SectionText>{demotivationMoment1}</SectionText>
      </WhiteCard>

      {/* Card Four */}
      <WhiteCard>
        <RedSectionTitle>相性の良いキャラクター</RedSectionTitle>
        <HorizontalLine />
        <div className="w-full grid grid-cols-2 gap-5 mt-4">
          <div className="w-full flex flex-col items-center gap-2">
            <Image
              alt=""
              src={`https://card.stg.be-native.life:8443/friends/charimg/${fitChara1}`}
              width={120}
              height={120}
              style={{ zIndex: 1 }}
            />
            <p
              className="text-[16px] font-semibold text-center"
              style={{ color: data?.hex1 }}
            >
              {fitChara1}
            </p>
            <div className="flex flex-row items-center justify-center gap-4">
              <SectionText>{fitChara1Hash1}</SectionText>
              <SectionText>{fitChara1Hash2}</SectionText>
            </div>
            <SectionText align="left">{fitChara1Title}</SectionText>
          </div>
          <div className="w-full flex flex-col items-center gap-2">
            <Image
              alt=""
              src={`https://card.stg.be-native.life:8443/friends/charimg/${fitChara2}`}
              width={120}
              height={120}
              style={{ zIndex: 1 }}
            />
            <p
              className="text-[16px] font-semibold text-center"
              style={{ color: data?.hex2 }}
            >
              {fitChara2}
            </p>
            <div className="flex flex-row items-center justify-center gap-4">
              <SectionText>{fitChara2Hash1}</SectionText>
              <SectionText>{fitChara2Hash2}</SectionText>
            </div>
            <SectionText align="left">{fitChara2Title}</SectionText>
          </div>
        </div>
        <div className="h-5" />
        <SectionText>フィットするnative. スコアの人</SectionText>
        <p className="text-[36px] text-black font-bold text-center">
          {getAlongScore1}~{getAlongScore2}
        </p>
        <div className="h-5" />
        <RedSectionTitle>私と仲良くなる秘訣</RedSectionTitle>
        <HorizontalLine />
        <div className="m-3">
          <SectionText align="left" thin>
            {secretGetAlong}
          </SectionText>
        </div>
      </WhiteCard>

      {/* Card Five */}
      <WhiteCard>
        <p className="text-[#EC736E] font-semibold text-[16px] text-center">
          今のMBTIの結果と比較
        </p>
        <HorizontalLine />
        <SectionText>生まれつきの性格タイプ</SectionText>
        <p
          className="font-extrabold text-[24px] text-[#56A278] text-center"
          style={{ fontWeight: 900 }}
        >
          <b>{card5Title}</b>
        </p>
        <SectionText>{card5SubTitle}</SectionText>
        <div className="h-3" />
        <p className="text-[#EC736E] font-semibold text-[16px] text-center">
          MBTI式native.スコア性格特性
        </p>
        <HorizontalLine />
        <div className="h-5" />
        <ColouredProgressIndicator
          color="#6894AE"
          percentage={percentage1}
          type={
            getPercentageLabel(
              Object.keys(mtbiData?.param_1 ?? {})?.[0] as string
            ) as string
          }
          startIndicator="外交型"
          endIndicator="内向型"
        />
        <ColouredProgressIndicator
          color="#D5B260"
          percentage={percentage2}
          type={
            getPercentageLabel(
              Object.keys(mtbiData?.param_2 ?? {})?.[0] as string
            ) as string
          }
          startIndicator="直感型"
          endIndicator="観察型"
        />
        <ColouredProgressIndicator
          color="#69A07B"
          percentage={percentage3}
          type={
            getPercentageLabel(
              Object.keys(mtbiData?.param_3 ?? {})?.[0] as string
            ) as string
          }
          startIndicator="思考型"
          endIndicator="感情型"
        />
        <ColouredProgressIndicator
          color="#7D6494"
          percentage={percentage4}
          type={
            getPercentageLabel(
              Object.keys(mtbiData?.param_4 ?? {})?.[0] as string
            ) as string
          }
          startIndicator="計画型"
          endIndicator="探索型"
        />
        <ColouredProgressIndicator
          color="#D16E6B"
          percentage={percentage5}
          type={
            getPercentageLabel(
              Object.keys(mtbiData?.param_5 ?? {})?.[0] as string
            ) as string
          }
          startIndicator="自己主張型"
          endIndicator="慎重型"
        />
      </WhiteCard>
      <div className="overflow-hidden">
        <div
          className="flex flex-col items-center gap-5 pb-5"
          style={{
            marginBottom: isReadMoreHidden ? "-2000px" : "0px",
            transition: "1.5s ease",
          }}
        >
          {/* Card Seven */}
          <WhiteCard>
            <RedSectionTitle>詳細なパーソナリティ</RedSectionTitle>
            <HorizontalLine />
            <SectionText>{personality2}</SectionText>
            <div className="h-5" />
          </WhiteCard>

          {/* Card Eight */}
          <WhiteCard>
            <RedSectionTitle>もっとテンションUPする瞬間</RedSectionTitle>
            <HorizontalLine />
            <SectionText>{motivationMoment2}</SectionText>
            <div className="h-5" />
            <RedSectionTitle>もっとテンションDOWNする瞬間</RedSectionTitle>
            <HorizontalLine />
            <SectionText>{demotivationMoment2}</SectionText>
          </WhiteCard>

          {/* Card Nine */}
          <WhiteCard>
            <GoldenSectionTitle>トリセツその１</GoldenSectionTitle>
            <HorizontalLine />
            <p
              className="text-black font-bold text-[16px] my-1"
              style={{ textAlign: "center" }}
            >
              {toreitsu1}
            </p>
            <SectionText align="left" thin>
              {toreitsu1Desc}
            </SectionText>
            <div className="h-5" />

            <GoldenSectionTitle>トリセツその２</GoldenSectionTitle>
            <HorizontalLine />
            <p
              className="text-black font-bold text-[16px] my-1"
              style={{ textAlign: "center" }}
            >
              {toreitsu2}
            </p>
            <SectionText align="left" thin>
              {toreitsu2Desc}
            </SectionText>
            <div className="h-5" />

            <GoldenSectionTitle>トリセツその３</GoldenSectionTitle>
            <HorizontalLine />
            <p
              className="text-black font-bold text-[16px] my-1"
              style={{ textAlign: "center" }}
            >
              {toreitsu3}
            </p>
            <SectionText align="left" thin>
              {toreitsu3Desc}
            </SectionText>
            <div className="h-5" />
          </WhiteCard>
        </div>
      </div>
      {/* Card Six */}
      <WhiteCard>
        <div className="h-5" />
        <p className="text-black text-center font-semibold text-[16px]">
          スキャンして相性診断
        </p>
        <div className="flex flex-col items-center mt-5 mb-8 w-[60%] mx-auto">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={shareLink}
            viewBox={`0 0 256 256`}
          />
        </div>
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
                  name
                )}`} native. card｜1秒自己探索アイテム「native.」@benative14`}&url=${encodeURIComponent(
                  shareLink
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
          <div
            className="w-[55px] aspect-square flex items-center justify-center rounded-[12px]"
            style={{ border: "0.6px solid #000" }}
            onClick={handleCopyLink}
          >
            <Image alt="" src={shareIcon} width={30} style={{ zIndex: 1 }} />
          </div>
        </div>
      </WhiteCard>

      <div className="h-5" />

      {isReferred ? (
        <button
          className="fixed bottom-0 left-[50%] font-semibold text-[14px] bg-[#EC736E] text-white w-max h-[50px] flex items-center justify-center rounded-[16px] px-4"
          style={{ transform: "translate(-50%,-50%)", zIndex: 9 }}
          onClick={handleCompatible}
        >
          {decodeURIComponent(`${referrerName}`)} さんとの相性診断 ⁨⁩⁨⁩ ▶︎
        </button>
      ) : null}

      {hideButton ? null : (
        <button
          onClick={handleReadMore}
          className=" border-none w-[85%] mx-auto h-[70px] flex items-center justify-center bg-black opacity-85 rounded-[20px]"
        >
          <p className="text-white text-[16px] font-semibold">さらに深く見る</p>
        </button>
      )}

      {/* Footer */}
      <div className="flex flex-col items-center mt-10 mb-1">
        <Image alt="" src={logo} width={150} style={{ zIndex: 1 }} />
      </div>
      <p className="text-center text-[8px] text-[#A1A1AA]">
        © 2024 native.K.K All Rights Reserved.
      </p>
    </div>
  );
}
