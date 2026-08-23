import { render, screen, fireEvent } from "@testing-library/react";
import { assertEquals } from "@std/assert";
import  { useState } from "react";

// Setup global DOM for React Testing Library
const window = new Window();
globalThis.document = window.document as unknown as Document;
globalThis.window = window as unknown as Window & typeof globalThis;
globalThis.navigator = window.navigator as unknown as Navigator;

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

Deno.test("increments count on click", () => {
  render(<Counter />);
  
  const button = screen.getByRole("button");
  assertEquals(button.textContent, "Count: 0");

  fireEvent.click(button);
  assertEquals(button.textContent, "Count: 1");
});