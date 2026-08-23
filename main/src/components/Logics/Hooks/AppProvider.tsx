import { ReactNode } from "react";
import { TimeProvider } from "./TimeProvider.tsx";
import { EventProvider } from "./EventProvider.tsx";
import { DragProvider } from "./DragProvider.tsx";
import DragEventHandler from "./DragEventHandler.tsx"
import { EventWidthProvider } from "./EventWidthProvider.tsx";

type Props = {
    children: ReactNode
}


export const AppProvider = ({children}: Props) =>{
      return (
        <TimeProvider>
          <EventProvider>
            <DragProvider>
             <EventWidthProvider>
               <DragEventHandler>
                  {children}
               </DragEventHandler>
             </EventWidthProvider>
            </DragProvider>
          </EventProvider>
        </TimeProvider>
      );
}