import { GlobalWindow } from "happy-dom";

const dom = new GlobalWindow();
globalThis.document = dom.document as unknown as Document;
globalThis.window = dom as unknown as (typeof globalThis & Window);
globalThis.navigator = dom.navigator as unknown as Navigator;
globalThis.HTMLElement = dom.HTMLElement as unknown as typeof HTMLElement;
globalThis.HTMLButtonElement = dom.HTMLButtonElement as unknown as typeof HTMLButtonElement;
globalThis.requestAnimationFrame = dom.requestAnimationFrame.bind(dom) as unknown as typeof requestAnimationFrame;
globalThis.cancelAnimationFrame = dom.cancelAnimationFrame.bind(dom) as unknown as typeof cancelAnimationFrame;
globalThis.scroll = dom.scroll.bind(dom) as unknown as typeof scroll;
globalThis.scrollTo = dom.scrollTo.bind(dom) as unknown as typeof scrollTo;
globalThis.NodeList = dom.NodeList as unknown as typeof NodeList;
