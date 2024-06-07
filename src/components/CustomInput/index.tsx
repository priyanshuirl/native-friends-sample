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
  return (
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
