"use client";
import InfoComponent from "@/components/InfoComponent";
import { useSearchParams } from "next/navigation";

export default function Info() {
  const searchParams = useSearchParams();
  return (
    <InfoComponent
      name={`${searchParams.get("name")}`}
      dob={{
        year: `${searchParams.get("dob")?.split("-")?.[0]}`,
        month: `${searchParams.get("dob")?.split("-")?.[1]}`,
        date: `${searchParams.get("dob")?.split("-")?.[2]}`,
      }}
    />
  );
}
