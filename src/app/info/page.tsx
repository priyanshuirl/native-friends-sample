import React from "react";
import { sampleChar } from "@/assets";
import Image from "next/image";

const WhiteCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-[95%] mx-auto flex flex-col gap-2 bg-white rounded-[20px] py-3 px-4"
      style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);" }}
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

const HorizontalLine = () => <div className="h-[0.4px] w-full bg-black" />;

const SectionText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-black text-center font-semibold text-[12px]">{children}</p>
);

export default function Info() {
  // Top Card
  const mainColor = "#92BB77";
  const userName = "テリー伊藤";
  const personalChara = "山の好奇心旺盛なコンサルタント";
  const catchTitle =
    "「山の好奇心旺盛なコンサルタント、知識の泉で未来を切り開く！学び続ける探求者の旅は終わらない！」";

  // Card One
  const nativeScore = 20;

  // Card Two
  const personalHash1 = "# 向上心";
  const personalHash2 = "# 成長意欲";
  const personalHash3 = "# 純真";
  const personality1 =
    "知識の探求者 -常に新しい知識を求め、学び続けることに情熱を持つ。問題解決のためにあらゆる情報を収集し、分析する姿勢が特徴。";
  const kanji1 = "# 計画魔神";
  const kanji2 = "# 素直実直";
  const kanji3 = "# 責任番長";

  // Card Three
  const motivationMoment1 = "新しい知識を得たとき";
  const motivationMoment1Desc =
    "「これ、知らなかった！」と新しい知識を発見した瞬間、心が踊る。";
  const demotivationMoment1 = "学ぶ機会が失われたとき";
  const demotivationMoment1Desc =
    "「これ、学べないの？」と感じると、心の中で「もっと知識を吸収したいのに！」と嘆く。";

  // Card Four
  const fitChara1 = "大地の完成鋭いアナリスト(EP-)";
  const fitChara1Hash1 = "# 優しい";
  const fitChara1Hash2 = "# 優柔不断";
  const fitChara1Title = "堅実なリーダーシップ  ";
  const fitChara1Desc =
    "大地の責任感強いプロジェクトリーダーは、いつも計画を立てて物事を進める堅実派。彼の指導の下で、プロジェクトはスムーズに進行する。";
  const fitChara2 = "鉄の真面目なマネージャー(IF+)";
  const fitChara2Hash1 = "# 優しい";
  const fitChara2Hash2 = "# 優柔不断";
  const fitChara2Title = "鉄壁の責任感  ";
  const fitChara2Desc =
    "鉄の真面目なマネージャーは、責任感が鉄のように強固。仕事に対する真面目な姿勢と計画性で、常に高い成果を出す。";
  const getAlongScore1 = 15;
  const getAlongScore2 = 25;
  const secretGetAlong =
    "「私と仲良くなりたい？それなら、心を開いて一緒に話し合おう！感情を大切にすることが好きだから、君も自分の気持ちを正直に伝えてくれると嬉い。共感と理解を大事にするから、相手の立場を考えたコミュニケーションが得意。お互いに助け合える関係を築こう。そして、一緒に感動を共有することが絆を深める鍵。共に感動し、笑顔を分かち合えると、最高のパートナーになれるよ！」";

  return (
    <div className="mx-auto max-w-[450px] w-full flex flex-col items-center gap-5 min-h-[100svh] pb-10">
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
        <SectionText>{motivationMoment1Desc}</SectionText>
        <div className="h-5" />
        <RedSectionTitle>テンションDOWNする瞬間</RedSectionTitle>
        <HorizontalLine />
        <SectionText>{demotivationMoment1}</SectionText>
        <SectionText>{demotivationMoment1Desc}</SectionText>
      </WhiteCard>
      {/* Card Four */}
      <WhiteCard>
        <RedSectionTitle>相性の良いキャラクター</RedSectionTitle>
        <HorizontalLine />
        <div className="w-full grid grid-cols-2 gap-5 mt-4">
          <div className="w-full flex flex-col items-center gap-2">
            <Image alt="" src={sampleChar} width={80} style={{ zIndex: 1 }} />
            <p className="text-[#92BB77] text-[12px] font-semibold text-center">
              {fitChara1}
            </p>
            <div className="flex flex-row items-center justify-center gap-4">
              <SectionText>{fitChara1Hash1}</SectionText>
              <SectionText>{fitChara1Hash2}</SectionText>
            </div>
            <p className="font-bold text-center text-black text-[14px]">
              {fitChara1Title}
            </p>
            <SectionText>{fitChara2Desc}</SectionText>
          </div>
          <div className="w-full flex flex-col items-center gap-2">
            <Image alt="" src={sampleChar} width={80} style={{ zIndex: 1 }} />
            <p className="text-[#92BB77] text-[12px] font-semibold text-center">
              {fitChara1}
            </p>
            <div className="flex flex-row items-center justify-center gap-4">
              <SectionText>{fitChara2Hash1}</SectionText>
              <SectionText>{fitChara2Hash2}</SectionText>
            </div>
            <p className="font-bold text-center text-black text-[14px]">
              {fitChara2Title}
            </p>
            <SectionText>{fitChara2Desc}</SectionText>
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
        <SectionText>{secretGetAlong}</SectionText>
      </WhiteCard>
    </div>
  );
}
