import TimeInput from "@/Logics/Inputs/TimeInput.tsx";

type Props = {
  color: string;
  text: string;
  onChange: (time: Date) => void;
  value: Date;
};

const SpecificTimeInput = ({ color, text, onChange, value }: Props) => {
  return (
    <div className="flex-1 flex flex-row items-center justify-around">
      <div className="text-medium text-nowrap">{text}</div>
      <div className="flex items-center">
        <TimeInput value={value} onChange={onChange} color={color} />
      </div>
    </div>
  );
};

export default SpecificTimeInput;
