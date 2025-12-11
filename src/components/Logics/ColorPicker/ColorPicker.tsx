import { COLORS, type Color } from "?/types.ts";
import ColorCell from "./ColorCell.tsx";
type Props = {
  onSelect: (color: Color) => void;
  selectedColor: string;
};
const ColorPicker = ({ onSelect, selectedColor }: Props) => {
  return (
    <div className="flex flex-wrap gap-2 items-center h-20 w-30">
      {COLORS.map((color, i) => {
        return (
          <ColorCell
            key={i}
            onSelect={onSelect}
            color={color}
            selected={color == selectedColor}
          />
        );
      })}
    </div>
  );
};

export default ColorPicker;
