"use client";
import {
  darkGreenChar,
  greenChar,
  orangeChar,
  pinkChar,
  yellowChar,
  brownChar,
  darkBlueChar,
  greyChar,
  lightBlueChar,
  purpleChar,
} from "@/assets";
import { CustomInput } from "@/components/CustomInput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const topCharacters = [
  greenChar,
  pinkChar,
  orangeChar,
  yellowChar,
  darkGreenChar,
];

const bottomCharacters = [
  brownChar,
  greyChar,
  purpleChar,
  darkBlueChar,
  lightBlueChar,
];

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleClick = () => router.push(`/info?name=${name}&dob=${date}`);

  return (
    <div className="max-w-[450px] m-auto flex flex-col justify-between items-center min-h-[100svh] bg-white">
      <div className="flex flex-col items-center gap-10 w-full">
        <h1 className="text-black text-center text-[28px] font-bold mt-10">
          native. for friends
        </h1>
        <div className="flex flex-row items-center justify-center gap-3">
          {topCharacters.map((image, index) => {
            return (
              <Image src={image} alt="" key={index} height={40} width={40} />
            );
          })}
        </div>
        <p className="text-[16px] text-black text-center font-semibold m-auto ">
          生年月日を入力して、
          <br /> 友達と深く通じ合おう。
        </p>
        <p className="text-black text-center text-[12px] font-normal">
          新感覚の1秒自己探索サービス「native.card」
          <br />
          お名前と生年月日入力のみで即時発行
        </p>
        <div className="w-[80%] flex flex-col gap-5">
          <CustomInput
            label="カードに挿入するお名前を入れてください"
            onChange={(value) => setName(value as string)}
            value={name}
            placeholder="お名前"
            type="text"
          />
          <CustomInput
            label="生年月日を入力してください"
            onChange={(value) => setDate(value as string)}
            value={date}
            placeholder="YYY-MMM-DD"
            type="date"
          />
        </div>
        <button
          className="rounded-[18px] bg-[#696969] w-[140px] h-[56px] px-[16px] py-[12px] text-white"
          onClick={handleClick}
        >
          発行する
        </button>
        <p className="text-black text-[12px] font-semibold">native. 1.8.3</p>
      </div>
      <div className="flex flex-row items-center justify-center gap-3 my-10">
        {bottomCharacters.map((image, index) => {
          return (
            <Image src={image} alt="" key={index} height={40} width={40} />
          );
        })}
      </div>
    </div>
  );
}
