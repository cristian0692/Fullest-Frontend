import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

const MainButton = ({ children, onClick }: Props) => {
  return (
    <button type="button"
      onClick={onClick}
      className="bg-primary text-white px-10 py-2 rounded-xl text-nowrap"
    >
      {children}
    </button>
  );
};

export default MainButton;
