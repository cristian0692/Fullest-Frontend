type Props = {
  title: string;
  description: string;
};

const Heading = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl">{title}</h1>
      <p className="font-normal">{description}</p>
    </div>
  );
};

export default Heading;
