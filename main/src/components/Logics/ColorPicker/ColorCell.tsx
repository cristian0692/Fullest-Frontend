import { IoIosCheckmark } from "react-icons/io";
import { Color } from "!/domain/model/enums/Color.ts";

type Props = {
  color: Color;
  selected?: boolean;
  onSelect: (color: Color) => void;
};

const ColorCell = ({ color, onSelect, selected = false }: Props) => {
  return (
    <div
      onClick={() => onSelect(color)}
      className={`p-4 ${color} transition-transform duration-300 hover:scale-130 relative hover:cursor-pointer`}
    >
      {selected && (
        <div className="absolute -left-1 -top-1">
          <IoIosCheckmark size={40} />
        </div>
      )}
    </div>
  );
};

export default ColorCell;
