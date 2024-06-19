"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { logo } from "@/assets/brand";
import { useRouter, useSearchParams } from "next/navigation";
import ShareSection from "../ShareSection";
import {
  GirlAnalyst,
  GirlInBalloon,
  GirlWithGiantFolder,
  GirlWithNotepad,
  GirlWithParachute,
  GirlWithSparkles,
  ManPondering,
} from "@/assets/illustrations";
import {
  ColouredProgressIndicator,
  GoldenSectionTitle,
  HorizontalLine,
  RedSectionTitle,
  SectionText,
  WhiteCard,
} from "../PageCommons";

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
  const searchParams = useSearchParams();
  const [isReadMoreHidden, setIsReadMoreHidden] = useState<boolean>(true);
  const [hideButton, setHideButton] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mtbiData, setMTBIData] = useState<any>();
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const [userIdForLink, setUserIdForLink] = useState<string>("");

  const handleReadMore = () => {
    scrollAnchorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
    setIsReadMoreHidden((prev) => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isReadMoreHidden) {
        setHideButton(true);
      }
    }, 1000);
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

    const userIdFromLocalStorage = localStorage.getItem("USER_ID");
    setUserIdForLink(`${userIdFromLocalStorage}`);
    if (!shared && !userIdFromLocalStorage) {
      const apiResponse = await fetch(
        `https://native.ikeda042api.net/api/friends/friends_cards/${encodeURIComponent(
          name
        )}/${year}/${month}/${date}`,
        { method: "POST" }
      );
      const data = await apiResponse.json();
      localStorage.setItem("USER_ID", data?.user_id);
      setUserIdForLink(data?.user_id);
      localStorage.setItem("USER_NAME", name);
      localStorage.setItem("USER_DOB", `${year}-${month}-${date}`);
    }
    const referrerUserIdFomUrl = searchParams.get("referrer-userid");
    if (referrerUserIdFomUrl) {
      localStorage.setItem("REFERRER_USER_ID", referrerUserIdFomUrl);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Top Card
  const mainColor = data?.hex_color;
  const qrCodeColor = data?.hex_color_qr;
  const userName = name;
  const userType = data?.param1;
  const personalChara = data?.param2;
  const catchTitle = data?.param3;

  // Card One
  const nativeScore = Math.round(Number(data?.native_score) * 2.77);

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

  const getAlongScore1 = Math.round(nativeScore - 13.85);
  const getAlongScore2 = Math.round(nativeScore + 13.85);

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
  )}/${`${year}-${month}-${date}`}?&referrer-userid=${userIdForLink}`;

  const handleIssueInstantly = () => {
    router.push(
      `/?referrer-name=${encodeURIComponent(
        name
      )}&referrer-dob=${`${year}-${month}-${date}`}`
    );
  };

  const handleCompatible = () => {
    if (!localStorage.getItem("USER_ID")) {
      router.push(
        `/compatibility?referrer-name=${encodeURIComponent(
          `${referrerName}`
        )}&referrer-dob=${`${referrerDOB?.year}-${referrerDOB?.month}-${referrerDOB?.date}`}&self-name=${name}&self-dob=${`${year}-${month}-${date}`}`
      );
    } else {
      router.push(
        `/compatibility?referrer-name=${encodeURIComponent(
          `${name}`
        )}&referrer-dob=${`${year}-${month}-${date}`}&self-name=${localStorage.getItem(
          "USER_NAME"
        )}&self-dob=${`${localStorage.getItem("USER_DOB")}`}`
      );
    }
  };

  const handleMatchPage = () => {
    router.push(
      `/matched?self-name=${name}&self-dob=${`${year}-${month}-${date}`}`
    );
  };

  return isLoading ? (
    <div className="min-h-[100svh] w-full flex flex-col items-center justify-center gap-2">
      <p className="text-[24px] font-bold text-neutral-800">読み込み中...</p>
    </div>
  ) : (
    <div className="mx-auto max-w-[450px] w-full flex flex-col items-center gap-5 min-h-[100svh] pb-10">
      {shared && !localStorage.getItem("USER_ID") ? (
        <button
          className="fixed bottom-0 font-bold left-[50%] text-[18px] bg-[#EC736E] text-white w-[200px] h-[50px] flex items-center justify-center rounded-[16px] z-[9]"
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
            <div className="w-full grid grid-cols-3 gap-1">
              <div className="w-full flex flex-col gap-1 items-center">
                <p className="font-semibold text-[#aaa] text-[12px]">
                  研究者気質
                </p>
              </div>
              <div className="w-full flex flex-col gap-1 items-center">
                <p className="font-semibold text-[#aaa] text-[12px]">
                  管理職気質
                </p>
              </div>
              <div className="w-full flex flex-col gap-1 items-center">
                <p className="font-semibold text-[#aaa] text-[12px]">
                  起業家気質
                </p>
              </div>
            </div>
            <div className="relative w-full flex flex-row items-center mb-2">
              <div className="absolute" style={{ left: `0%` }}>
                <p className="font-semibold text-[#aaa] text-[12px]">1</p>
              </div>
              <div className="absolute" style={{ left: `33%` }}>
                <p
                  className="font-semibold text-[#aaa] text-[12px] pr-1"
                  style={{ borderRight: "0.4px solid #aaa" }}
                >
                  33
                </p>
              </div>
              <div className="absolute" style={{ left: `66%` }}>
                <p
                  className="font-semibold text-[#aaa] text-[12px] pl-1"
                  style={{ borderLeft: "0.4px solid #aaa" }}
                >
                  66
                </p>
              </div>
              <div className="absolute" style={{ left: `92%` }}>
                <p className="font-semibold text-[#aaa] text-[12px]">100</p>
              </div>
            </div>
            <div
              className="h-[12px] rounded-full overflow-hidden flex flex-row items-center relative"
              style={{
                background:
                  "linear-gradient(90deg, rgba(142,135,227,1) 0%, rgba(187,135,227,1) 35%, rgba(227,135,213,1) 100%)",
              }}
            >
              <div
                className="w-[15px] h-[15px] bg-[#AAA] rounded-full absolute "
                style={{
                  border: "3px solid #fff",
                  left: `${getAlongScore1}%`,
                }}
              />
              <div
                className="w-[15px] h-[15px] bg-[#EC736E] rounded-full absolute "
                style={{
                  border: "3px solid #fff",
                  left: `${nativeScore}%`,
                }}
              />
              <div
                className="w-[15px] h-[15px] bg-[#AAA] rounded-full absolute "
                style={{
                  border: "3px solid #fff",
                  left: `${getAlongScore2}%`,
                }}
              />
            </div>
            <div className="w-full relative">
              <div
                className="h-3 w-[1px] bg-[#AAA] absolute ml-[7px]"
                style={{ left: `${getAlongScore1}%` }}
              />
              <div
                className="h-3 w-[1px] bg-[#AAA] absolute ml-[7px]"
                style={{ left: `${getAlongScore2}%` }}
              />
              <div
                className="h-[1px] bg-[#AAA] top-[11px] absolute ml-[7.5px]"
                style={{
                  left: `${getAlongScore1}%`,
                  width: `${getAlongScore2 - getAlongScore1}%`,
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="mt-[20px] mx-auto"
          style={{
            left: `${getAlongScore1 - 25}%`,
          }}
        >
          <p className="font-semibold text-black text-[12px] whitespace-nowrap">
            あなたと相性が良い人のスコアは{getAlongScore1}~{getAlongScore2}
          </p>
        </div>
      </WhiteCard>

      {/* Card Two */}
      <WhiteCard>
        <RedSectionTitle>パーソナリティ</RedSectionTitle>
        <HorizontalLine />
        <div className="mx-auto">
          <Image alt="" src={GirlWithNotepad} width={150} height={120} />
        </div>
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
        <div className="mx-auto">
          <Image alt="" src={GirlInBalloon} width={150} height={120} />
        </div>
        <SectionText>{motivationMoment1}</SectionText>
        <div className="h-5" />
        <RedSectionTitle>テンションDOWNする瞬間</RedSectionTitle>
        <HorizontalLine />
        <div className="mx-auto">
          <Image alt="" src={GirlWithParachute} width={150} height={120} />
        </div>
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
        <RedSectionTitle>私と仲良くなる秘訣</RedSectionTitle>
        <HorizontalLine />
        <div className="mx-3 my-0">
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
      <div ref={scrollAnchorRef} />
      <div className="overflow-hidden">
        <div
          className="flex flex-col items-center gap-5 pb-5"
          style={{
            marginBottom: isReadMoreHidden ? "-2200px" : "0px",
            transition: "1.5s ease",
          }}
        >
          {/* Card Seven */}
          <WhiteCard>
            <RedSectionTitle>詳細なパーソナリティ</RedSectionTitle>
            <HorizontalLine />
            <div className="mx-auto">
              <Image alt="" src={GirlAnalyst} width={150} height={120} />
            </div>
            <SectionText>{personality2}</SectionText>
            <div className="h-5" />
          </WhiteCard>

          {/* Card Eight */}
          <WhiteCard>
            <RedSectionTitle>もっとテンションUPする瞬間</RedSectionTitle>
            <HorizontalLine />
            <div className="mx-auto">
              <Image alt="" src={GirlWithSparkles} width={150} height={120} />
            </div>
            <SectionText>{motivationMoment2}</SectionText>
            <div className="h-5" />
            <RedSectionTitle>もっとテンションDOWNする瞬間</RedSectionTitle>
            <HorizontalLine />
            <div className="mx-auto my-5">
              <Image alt="" src={ManPondering} width={150} height={120} />
            </div>
            <SectionText>{demotivationMoment2}</SectionText>
          </WhiteCard>

          {/* Card Nine */}
          <WhiteCard>
            <div className="mx-auto">
              <Image
                alt=""
                src={GirlWithGiantFolder}
                width={150}
                height={120}
              />
            </div>
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

      <ShareSection name={name} shareLink={shareLink} mainColor={qrCodeColor} />

      <div className="h-5" />

      {isReferred ||
      (localStorage.getItem("USER_ID") &&
        searchParams.get("referrer-userid")) ? (
        <button
          className="fixed bottom-0 left-[50%] font-bold text-[14px] bg-[#EC736E] text-white w-max h-[50px] flex items-center justify-center rounded-[16px] px-4 z-10"
          style={{ transform: "translate(-50%,-50%)", zIndex: 9 }}
          onClick={handleCompatible}
        >
          {!localStorage.getItem("USER_ID")
            ? decodeURIComponent(`${referrerName}`)
            : decodeURIComponent(`${name}`)}{" "}
          さんとの相性診断 ⁨⁩⁨⁩ ▶︎
        </button>
      ) : null}

      <button
        onClick={handleMatchPage}
        className=" border-none w-[85%] mx-auto h-[70px] flex items-center justify-center bg-[#6B6B6BD9] opacity-85 rounded-[20px]"
      >
        <p className="text-white text-[16px] font-semibold">
          診断結果一覧を見る
        </p>
      </button>

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
