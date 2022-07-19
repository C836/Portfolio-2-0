import { useEffect, useRef, useState, WheelEvent } from "react";
import { getScrollDirection } from "./utils/Scroll/ScrollDirection";

import { GlobalStyle } from "./global";

import Intro from "./sections/Intro/Intro";
import About from "./sections/About/About";
import Projects from "./sections/Projects/Projects";
import Pagination from "./components/Pagination/Pagination";
import { Background } from "./layout/Background/Background.styled";
import Contact from "./sections/Contact/Contact";
import useWindowDimensions from "./utils/WindowDimensions";
import Stacks from "./sections/Stacks/Stacks";

interface RefsConfig {
  [key: string]: any
}

function App() {
  const appSections = [
    "IntroRef",
    "AboutRef",
    "TechRef",
    "ProjectRef1",
    "ProjectRef2",
    "ProjectRef3",
    "ProjectRef4",
    "ContactRef",
  ];
  const [currentPageIndex, setPageIndex] = useState(0);

  const { width } = useWindowDimensions();

  const scroll = (scrollSection: string) => {
    const selected_Section = Refs[scrollSection];

    selected_Section.ref.current?.scrollIntoView({
      behavior: "smooth",
      block: selected_Section.block,
      inline: "center",
    });
  };

  const Refs: RefsConfig = {
    IntroRef: { ref: useRef<HTMLElement>(null), block: "start" },
    AboutRef: { ref: useRef<HTMLElement>(null), block: "start" },
    TechRef: { ref: useRef<HTMLElement>(null), block: "start" },

    ProjectRef1: { ref: useRef<HTMLElement>(null), block: "start" },
    ProjectRef2: { ref: useRef<HTMLElement>(null), block: "center" },
    ProjectRef3: { ref: useRef<HTMLElement>(null), block: "center" },
    ProjectRef4: { ref: useRef<HTMLElement>(null), block: "center" },

    ContactRef: { ref: useRef<HTMLElement>(null), block: "start" },
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
    if (width >= 850) {
      const currentPageSection = appSections[currentPageIndex];

      scroll(currentPageSection);
    }
  }, [currentPageIndex]);

  return (
    <div onWheel={handleScroll}>
      <GlobalStyle />
      <Background />

      {width >= 850 && (
        <Pagination pageIndex={currentPageIndex} sections={appSections} />
      )}

      <Intro IntroRef={Refs.IntroRef.ref} />
      <div className="padding">
        <About AboutRef={Refs.AboutRef.ref} />
        <Stacks TechRef={Refs.TechRef.ref} />
        <Projects
          ProjectRef1={Refs.ProjectRef1.ref}
          ProjectRef2={Refs.ProjectRef2.ref}
          ProjectRef3={Refs.ProjectRef3.ref}
          ProjectRef4={Refs.ProjectRef4.ref}
        />
      </div>

      <Contact ContactRef={Refs.ContactRef.ref} />
    </div>
  );
}

export default App;
