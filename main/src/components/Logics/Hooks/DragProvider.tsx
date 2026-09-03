import { createContext, useContext, useState } from "react";
import { Coordinate } from "!/domain/model/Coordintate.ts";
import { DayEvent } from "!/domain/model/DayEvent.ts";
// 1. Define the context type
type DragContextType = {
  barPosition: Coordinate;
  setBarPosition: React.Dispatch<React.SetStateAction<Coordinate>>;
  activeEvent: DayEvent | null;
  setActiveEvent: React.Dispatch<React.SetStateAction<DayEvent | null>>;
  isDraggable: boolean;
  setIsDraggable: React.Dispatch<React.SetStateAction<boolean>>;
  quantityMoved: number;
  setQuantityMoved: React.Dispatch<React.SetStateAction<number>>;
  inserted: InsertionType | null;
  setInserted: React.Dispatch<React.SetStateAction<InsertionType | null>>;
};

export enum InsertionType {
  initialize,
  in,
  out,
}
// 2. Create the context
const DragContext = createContext<DragContextType | null>(null);

// 3. Provider component
export const DragProvider = ({ children }: { children: React.ReactNode }) => {
  const [barPosition, setBarPosition] = useState<Coordinate>({ x: 0, y: 0 }); // absolute position of the bar
  const [activeEvent, setActiveEvent] = useState<DayEvent | null>(null);
  const [isDraggable, setIsDraggable] = useState(false); // controls whether draggable objects can be dragged
  const [inserted, setInserted] = useState<InsertionType | null>(
    InsertionType.initialize,
  );
  const [quantityMoved, setQuantityMoved] = useState(0);
  return (
    <DragContext.Provider
      value={{
        barPosition,
        setBarPosition,
        activeEvent,
        setActiveEvent,
        isDraggable,
        setIsDraggable,
        inserted,
        setInserted,
        quantityMoved,
        setQuantityMoved
      }}
    >
      {children}
    </DragContext.Provider>
  );
};

// 4. Custom hook
export const useDrag = () => {
  const ctx = useContext(DragContext);
  if (!ctx) throw new Error("useDrag must be used inside <DragProvider>");
  return ctx;
};
