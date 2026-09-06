import { useEffect, useRef, useState } from "react";
import { TimeValue } from "!/domain/model/TimeValue.ts";

type Props = {
  color: string;
  value: TimeValue;
  onChange: (time: TimeValue) => void;
  max?: number;
  isDuration?: boolean;
};

function generateTimes(max: number, duration?: boolean) {
  return Array.from({ length: max * 4 + (duration ? 1 : 0) }, (_, i) => {
    const skipZeroValue = 1;

    const minuteIndex = duration ? i + skipZeroValue : i;
    const hours = Math.floor(minuteIndex / 4);
    const minutes = (minuteIndex % 4) * 15;
    const date = new TimeValue(minutes, hours);

    return date;
  });
}

const TimeInput = ({ color, onChange, value, max = 24, isDuration }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [shortcutInput, setShortcutInput] = useState(0); //when the user presses on keypad to set the input
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const times = generateTimes(max, isDuration);

  const selectedIndex = times.findIndex(
    (time) => time.getTotalMinutes() === value.getTotalMinutes(),
  );

  const scrollToHour = (input: string) => {
    const hour = Number(input);
    if (Number.isNaN(hour)) {
      return;
    }
    if (shortcutInput * 10 + hour > 24 || shortcutInput * 10 + hour > max) {
      return;
    }
    setShortcutInput((prev) => prev * 10 + hour);
  };

  useEffect(() => {
    if (!isOpen) return;
    onChange(new TimeValue(shortcutInput));

    optionRefs.current[shortcutInput * 4]?.scrollIntoView({
      block: "center",
      inline: "nearest",
    });
  }, [shortcutInput]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShortcutInput(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll to selected when dropdown opens
  useEffect(() => {
    if (isOpen && selectedIndex >= 0) {
      optionRefs.current[selectedIndex]?.scrollIntoView({
        block: "center",
        inline: "nearest",
      });
    }
  }, [isOpen, selectedIndex]);

  const handleSelect = (time: TimeValue) => {
    onChange(time);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ---------------- Trigger ----------------------- */}
      <div
        className={`w-fit flex flex-col px-4 py-2 rounded-2xl text-large cursor-pointer select-none ${color} ${
          color != "transparent"
            ? "hover:-my-7 hover:py-7"
            : "border-primary hover:border-y-5"
        } transition-all duration-200 ease-in-out`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => scrollToHour(e.key)}
        tabIndex={0}
        style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
      >
        <span>{value.toString()}</span>
      </div>
      {/*------------------ Drop Down ------------------ */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10 border border-gray-600">
          {times.map((time, index) => (
            <div
              key={`${color}-${time.toString()}`}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              className={`px-4 py-2 cursor-pointer transition-colors duration-150 ${
                hoveredIndex === index
                  ? "bg-gray-700 text-white"
                  : value.getTotalMinutes() === time.getTotalMinutes()
                    ? `${
                        color != "transparent" ? color : "bg-gray-700"
                      } text-white`
                    : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => handleSelect(time)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              {time.toString()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeInput;
