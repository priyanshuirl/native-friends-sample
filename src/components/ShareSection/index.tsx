import React from "react";
import { facebookIcon, lineIcon, shareIcon, xIcon } from "@/assets/social";
import { logoJPG } from "@/assets/brand";
import { QRCode } from "react-qrcode-logo";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { WhiteCard } from "../InfoComponent";
import Image from "next/image";
import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
} from "react-share";

interface PropTypes {
  shareLink: string;
  mainColor?: string;
  name: string;
}

export default function ShareSection({
  mainColor,
  name,
  shareLink,
}: PropTypes) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
  };
  const shareTitle = `生年月日入力のみで、自分の可能性が拓ける ${`${encodeURIComponent(
    name
  )} native. card｜1秒自己探索アイテム「native.」`}`;
  return (
    <WhiteCard>
      <div className="h-5" />
      {mainColor ? (
        <p className="text-black text-center font-semibold text-[16px]">
          スキャンして相性診断
        </p>
      ) : null}
      {mainColor ? (
        <div className="flex flex-col items-center mt-5 mb-8 w-[60%] mx-auto">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={shareLink}
            fgColor={mainColor}
            logoImage={logoJPG.src}
            logoHeight={40}
            logoWidth={90}
            logoOpacity={1}
            removeQrCodeBehindLogo
            qrStyle="fluid"
            logoPadding={10}
            logoPaddingStyle="square"
          />
        </div>
      ) : null}
      <p className="text-black text-center font-semibold text-[16px]">
        native.をSNSでシェア、相性診断
      </p>
      <div className="mt-2 flex w-full flex-row justify-center gap-3 items-center mb-2">
        <TwitterShareButton
          title={shareTitle}
          url={shareLink}
          hashtags={["native.", "nativeで繋がろう", "MBTI"]}
          related={["@benative14"]}
        >
          <div
            className="w-[55px] aspect-square flex items-center justify-center rounded-[12px]"
            style={{ border: "0.6px solid #000" }}
          >
            <Image alt="" src={xIcon} width={30} style={{ zIndex: 1 }} />
          </div>
        </TwitterShareButton>
        <LineShareButton title={shareTitle} url={shareLink}>
          <div
            className="w-[55px] aspect-square flex items-center justify-center rounded-[12px]"
            style={{ border: "0.6px solid #000" }}
          >
            <Image alt="" src={lineIcon} width={30} style={{ zIndex: 1 }} />
          </div>
        </LineShareButton>
        <FacebookShareButton url={shareLink} title={shareTitle}>
          <div
            className="w-[55px] aspect-square flex items-center justify-center rounded-[12px]"
            style={{ border: "0.6px solid #000" }}
          >
            <Image alt="" src={facebookIcon} width={30} style={{ zIndex: 1 }} />
          </div>
        </FacebookShareButton>
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
    </WhiteCard>
  );
}
