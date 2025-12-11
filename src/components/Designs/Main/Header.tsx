import MainButton from "./MainButton.tsx";

const Header = () => {
  return (
    <div className="w-full h-fit flex-1 py-10 px-7 flex justify-center">
      <div className=" max-w-[1280px] h-fit w-full flex justify-between items-center text-primary font-bold">
        <a href="/" className="text-medium">
          Fullest
        </a>
        {/* <MainButton>Start now</MainButton> */}
      </div>
    </div>
  );
};

export default Header;
