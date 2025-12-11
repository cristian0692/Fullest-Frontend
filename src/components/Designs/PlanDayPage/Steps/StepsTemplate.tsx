import type { ReactNode } from "react";
import CountItem from "@/Designs/PlanDayPage/CountItem.tsx";

type Props = {
  children: ReactNode;
  number: number;
};

const StepsTemplate = ({ number, children }: Props) => {
  return (
    <div className="flex items-start gap-20">
      <div className="-ml-30">
        <CountItem number={number} />
      </div>
      <div className="w-full bg-dark rounded-2xl px-10 py-5 text-white">
        <div className="flex flex-col gap-10">{children}</div>
      </div>
    </div>
  );
};

export default StepsTemplate;
