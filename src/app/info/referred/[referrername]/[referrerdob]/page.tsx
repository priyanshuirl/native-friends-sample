"use client";
import InfoComponent from "@/components/InfoComponent";
import { useParams, useSearchParams } from "next/navigation";

export default function Info() {
  const params = useParams();
  const searchParams = useSearchParams();
  return (
    <InfoComponent
      isReferred
      referrerName={`${params?.referrername}`}
      referrerDOB={{
        year: `${(params?.referrerdob as string)?.split("-")?.[0]}`,
        month: `${(params?.referrerdob as string)?.split("-")?.[1]}`,
        date: `${(params?.referrerdob as string)?.split("-")?.[2]}`,
      }}
      name={`${searchParams.get("name")}`}
      dob={{
        year: `${searchParams.get("dob")?.split("-")?.[0]}`,
        month: `${searchParams.get("dob")?.split("-")?.[1]}`,
        date: `${searchParams.get("dob")?.split("-")?.[2]}`,
      }}
    />
  );
}
