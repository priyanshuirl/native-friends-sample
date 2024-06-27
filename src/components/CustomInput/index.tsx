import { useState } from "react";
//@ts-ignore
import DatePicker from "react-mobile-datepicker";

interface PropTypes {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type: "text" | "date";
  placeholder: string;
}

export const CustomInput = ({
  label,
  onChange,
  type,
  value,
  placeholder,
}: PropTypes) => {
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const handleSelect = (time: any) => {
    //@ts-ignore
    onChange(time);
    setDatePickerOpen(false);
  };
  const handleCancel = () => {
    setDatePickerOpen(false);
  };
  return type === "date" ? (
    <>
      <DatePicker
        value={value ?? new Date("1995-1-1")}
        isOpen={datePickerOpen}
        onSelect={handleSelect}
        onCancel={handleCancel}
        confirmText={"決定"}
      />
      <div className="w-full flex flex-col gap-2">
        <p className="text-[12px] text-black font-normal ">{label}</p>
        <div
          className="flex flex-row items-center justify-between gap-2 border-2 border-black rounded-[8px] py-[14px] px-[16px]"
          onClick={() => setDatePickerOpen(true)}
        >
          {value === null ? (
            <div className="h-[24px] text-gray-400">yyyy-mm-dd</div>
          ) : (
            <div className="h-[24px] text-black">
              {new Date(value).toISOString()?.split("T")?.[0]}
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <div className="w-full flex flex-col gap-2">
      <p className="text-[12px] text-black font-normal ">{label}</p>
      <div className="flex flex-row items-center gap-2 border-2 border-black rounded-[8px] py-[14px] px-[16px]">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border-none outline-none"
        />
      </div>
    </div>
  );
};
