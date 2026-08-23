import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

const SecondaryButton = ({ children, onClick }: Props) => {
  return (
    <button type="button"
      onClick={onClick}
      className="bg-transparent border-primary border-4 text-primary px-10 py-2 rounded-xl font-bold  text-nowrap"
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
