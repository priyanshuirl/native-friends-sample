"use client";
import InfoComponent from "@/components/InfoComponent";
import { useParams } from "next/navigation";

export default function Info() {
  const params = useParams();
  return (
    <InfoComponent
      shared
      name={`${`${decodeURIComponent(`${params?.referrername}`)}`}`}
      dob={{
        year: `${(params?.referrerdob as string)?.split("-")?.[0]}`,
        month: `${(params?.referrerdob as string)?.split("-")?.[1]}`,
        date: `${(params?.referrerdob as string)?.split("-")?.[2]}`,
      }}
    />
  );
}
