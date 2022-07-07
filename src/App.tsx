import { useEffect, useRef, useState, WheelEvent } from "react";
import { getScrollDirection } from "./utils/Scroll/ScrollDirection";

import { GlobalStyle } from "./global";

import Intro from "./sections/Intro/Intro";
import About from "./sections/About/About";
import Highlights from "./sections/Projects/Highlights/Highlights";
import Pagination from "./components/Pagination/Pagination";
import Extras from "./sections/Projects/Extras/Extras";
import { Background } from "./layout/Background/Background.styled";
import Contact from "./sections/Contact/Contact";
import useWindowDimensions from "./utils/WindowDimensions";

interface RefsConfig {

  [key: string]:{ref: React.RefObject<HTMLElement>, block: ScrollLogicalPosition};
}

function App() {
  const appSections = ["IntroRef", "AboutRef", "HighlightRef1", "HighlightRef2", "HighlightRef3", "ExtraRef1", "ExtraRef2", "ContactRef"];
  const [currentPageIndex, setPageIndex] = useState(0);

  const { width, height } = useWindowDimensions()

  const scroll = (scrollSection: string) => {
    Refs[scrollSection].ref.current?.
      scrollIntoView({ 
      behavior: "smooth",
      block: Refs[scrollSection].block,
      inline: 'center' });
  };

  const Refs: RefsConfig = {
    IntroRef: {ref: useRef<HTMLElement>(null), block: "start"},
    AboutRef: {ref: useRef<HTMLElement>(null), block: "start"},

    HighlightRef1: {ref: useRef<HTMLElement>(null), block: "center"},
    HighlightRef2: {ref: useRef<HTMLElement>(null), block: "center"},
    HighlightRef3: {ref: useRef<HTMLElement>(null), block: "center"},

    ExtraRef1: {ref: useRef<HTMLElement>(null), block: "center"},
    ExtraRef2: {ref: useRef<HTMLElement>(null), block: "center"},

    ContactRef: {ref: useRef<HTMLElement>(null), block: "start"}
  };

  const handleScroll = (event: WheelEvent) => {
    const direction = getScrollDirection(event);

    if (direction === "up" && currentPageIndex > 0) {
      setPageIndex(currentPageIndex - 1);
    } else if (
      direction === "down" &&
      currentPageIndex < appSections.length - 1
    ) {
      setPageIndex(currentPageIndex + 1);
    }
  };

  useEffect(() => {
    console.log(currentPageIndex);
    const currentPageSection = appSections[currentPageIndex];

    scroll(currentPageSection);
  }, [currentPageIndex]);

  return (
    <div onWheel={handleScroll}>
      <p style={{position: "fixed", color: "white"}}>{width}</p>
      <GlobalStyle />
      <Background />

      { 
        width > 850 && <Pagination 
        pageIndex={currentPageIndex}
        sections = {appSections} /> 
      }

      <Intro IntroRef={Refs.IntroRef.ref} />
      <div className="app">
        <About AboutRef={Refs.AboutRef.ref} />
        <Highlights
          HighlightRef1={Refs.HighlightRef1.ref}
          HighlightRef2={Refs.HighlightRef2.ref}
          HighlightRef3={Refs.HighlightRef3.ref}
        />
        <Extras
          ExtraRef1={Refs.ExtraRef1.ref}
          ExtraRef2={Refs.ExtraRef2.ref} />

        <Contact
          ContactRef={Refs.ContactRef.ref} />
      </div>
    </div>
  );
}

export default App;
