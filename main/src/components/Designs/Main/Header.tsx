import { useNavigate } from "react-router-dom";
import MainButton from "./MainButton.tsx";
import { useAuth } from "@/Logics/Hooks/AuthContext.tsx";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full h-fit flex-1 py-10 px-7 flex justify-center">
      <div className=" max-w-[1280px] h-fit w-full flex justify-between items-center text-primary font-bold">
        <a href="/" className="text-medium">
          Fullest
        </a>
        <div className="flex gap-10">
          <MainButton>Start now</MainButton>
          <button type="button" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
