"use client";
import { ChatBubbleTriangle } from "@/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
//@ts-ignore
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useRouter, useSearchParams } from "next/navigation";
import ShareSection from "@/components/ShareSection";
import { logo } from "@/assets/brand";

const MatchedCard = ({
  hexColor,
  name,
  bubbleText,
  sideText,
  type,
  score,
  dob,
  userId,
}: {
  hexColor: string;
  name: string;
  bubbleText: string;
  sideText: string;
  type: string;
  score: number | string;
  dob: string;
  userId: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const self = {
    year: `${searchParams.get("self-dob")?.split("-")?.[0]}`,
    month: `${searchParams.get("self-dob")?.split("-")?.[1]}`,
    date: `${searchParams.get("self-dob")?.split("-")?.[2]}`,
  };
  const handleCompatibilityCheck = () => {
    router.push(
      `/compatibility?referrer-name=${encodeURIComponent(
        `${name}`
      )}&referrer-dob=${`${dob?.split("-")?.[0]}-${dob?.split("-")?.[1]}-${
        dob?.split("-")?.[2]
      }`}&self-name=${searchParams.get(
        "self-name"
      )}&self-dob=${`${self.year}-${self.month}-${self.date}`}&auxuserid=${userId}`
    );
  };
  return (
    <div className="mt-10">
      <div
        className="p-3 w-full rounded-[16px] relative overflow-hidden"
        style={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          style={{ background: hexColor, opacity: 0.15 }}
          className="w-[660px] h-[708px] absolute top-0 left-0 z-0"
        />
        <div className="z-10 relative">
          <div>
            <p
              className="text-center font-semibold text-[14px]"
              style={{ color: hexColor }}
            >
              {name}さんの native.card
            </p>
          </div>
          <div
            className="h-[1px] w-full mt-2 mb-3"
            style={{ background: hexColor }}
          />
          <div className="w-full flex flex-row justify-between">
            <div className="bg-white rounded-[16px] w-[45%] p-2 relative">
              <p style={{ color: hexColor }} className="text-[10px]">
                {bubbleText}
              </p>
              <div className="absolute bottom-[-17px] right-10">
                <Image src={ChatBubbleTriangle} width={40} height={40} alt="" />
              </div>
            </div>
            <p style={{ color: hexColor }} className="text-[10px] w-[45%]">
              {sideText}
            </p>
          </div>
          <div className="flex flex-row items-end justify-center gap-2 mt-2">
            <h1
              className="font-extrabold text-[28px]"
              style={{ color: hexColor }}
            >
              {type}
            </h1>
            <Image
              alt=""
              src={`https://card.stg.be-native.life:8443/friends/charimg/${type}`}
              width={100}
              height={100}
              style={{ zIndex: 1 }}
            />
            <div className="w-[80px]">
              <CircularProgressbarWithChildren
                value={Number(score)}
                strokeWidth={14}
                styles={buildStyles({
                  pathColor: hexColor,
                  trailColor: "#E5E5E5",
                  pathTransitionDuration: 0.5,
                })}
              >
                <div
                  style={{ fontSize: 12 }}
                  className="bg-white h-[75%] w-[75%] rounded-full flex flex-col items-center justify-center"
                >
                  <p className="text-center text-[#EC736E] text-[22px] font-extrabold">
                    {score}
                    <span className="text-black text-[14px]">%</span>
                  </p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
        </div>
      </div>
      <div className="h-4" />
      {score === "??" ? (
        <button
          onClick={handleCompatibilityCheck}
          className=" border-none w-[100%] mx-auto min-h-[56px] flex items-center justify-center bg-[#EC736E] rounded-[20px]"
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        >
          <p className="text-white text-[16px] font-semibold">
            {name}さんとの相性を見る
          </p>
        </button>
      ) : (
        <button
          onClick={handleCompatibilityCheck}
          className=" border-none w-[100%] mx-auto min-h-[56px] flex items-center justify-center bg-[#E5E5E5] rounded-[20px]"
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        >
          <p className="text-black text-[16px] font-semibold">
            もう一度結果を見る
          </p>
        </button>
      )}
    </div>
  );
};

export default function Matched() {
  const searchParams = useSearchParams();
  const [matchedData, setMatchedData] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    const apiResponse = await fetch(
      `https://native.ikeda042api.net/api/users/related/${localStorage.getItem(
        "USER_ID"
      )}`
    );
    const data = await apiResponse.json();
    const dataArray = await Promise.all(
      data?.map(async ({ user_id, input_name, dob }: any) => {
        const apiResScore = await fetch(
          `https://native.ikeda042api.net/api/users/pair_score/${localStorage.getItem(
            "USER_ID"
          )}/${user_id}`
        );
        const scoreData = await apiResScore.json();
        const apiResInfo = await fetch(
          `https://card.stg.be-native.life:8443/friends/friends_data/${`${
            dob?.split("-")?.[0]
          }`}/${`${dob?.split("-")?.[1]}`}/${`${dob?.split("-")?.[2]}`}`
        );
        const infoData = await apiResInfo.json();
        return { user_id, input_name, dob, score: scoreData?.score, infoData };
      })
    );
    setMatchedData(dataArray);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(matchedData, "here");

  return isLoading ? (
    <div className="min-h-[100svh] w-full flex flex-col items-center justify-center gap-2">
      <p className="text-[24px] font-bold text-neutral-800">読み込み中...</p>
    </div>
  ) : (
    <div className="p-5 bg-white w-full min-h-[100svh]">
      <div className="max-w-[450px] mx-auto">
        <p className="font-bold text-[18px] text-black">native.相性診断結果</p>
        {matchedData?.map(
          ({
            user_id,
            infoData: { hex_color, param20, param3, param1 },
            input_name,
            score,
            dob,
          }) => {
            return (
              <MatchedCard
                key={user_id}
                hexColor={hex_color}
                name={input_name}
                bubbleText={param20}
                sideText={param3}
                type={param1}
                score={score}
                dob={dob}
                userId={user_id}
              />
            );
          }
        )}
        <div className="h-10" />
        <ShareSection
          name={`${searchParams.get("self-name")}`}
          shareLink={window.location.origin}
        />
        <div className="flex flex-col items-center mt-10 mb-1">
          <Image alt="" src={logo} width={150} style={{ zIndex: 1 }} />
        </div>
        <p className="text-center text-[8px] text-[#A1A1AA]">
          © 2024 native.K.K All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
