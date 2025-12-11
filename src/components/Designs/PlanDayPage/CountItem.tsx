type Props = {
  number: number;
};

const CountItem = ({ number }: Props) => {
  return (
    <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-medium text-white">
      {number}
    </div>
  );
};

export default CountItem;
