import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import TOC from "../toc";

function OutlineExplorer({
  content,
  theme,
  setTheme,
  setNavOpen,
  setSection,
  current,
}) {
  const [parents, setParents] = useState([]);

  useEffect(() => {
    if (current) {
      const p = [];
      let parent = document.querySelector(`.toc [href="#${current}"]`);
      while (true) {
        parent = parent?.closest("ul").previousElementSibling;
        if (parent?.tagName === "A") {
          parent.classList.add("active-section");
          p.push("#" + parent.href.split("#")[1]);
        } else {
          break;
        }
      }
      p.unshift("#" + current);
      setParents(p);
    }
  }, [current]);

  useEffect(() => {
    console.log(parents);
  }, [parents]);

  return (
    <div className="relative">
      <div className="w-full px-4 flex items-center justify-between mb-6">
        <button onClick={() => setSection("articles")}>
          <Icon
            icon="mdi:view-agenda-outline"
            className="w-4 h-4 text-neutral-700 dark:text-neutral-100"
          />
        </button>
        <h1 className="font-medium text-base mt-0 mb-0 outline-none after:hidden">
          outline
        </h1>
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Icon
            icon={`uil:${theme === "dark" ? "moon" : "brightness"}`}
            className="w-[1.1rem] h-[1.1rem] text-neutral-700 dark:text-neutral-100"
          />
        </button>
      </div>
      <ReactMarkdown
        children={TOC(content)}
        components={{
          a: (props) => (
            <a
              onClick={() => setNavOpen(false)}
              href={props.href}
              target={!props.href.startsWith("#") ? "_blank" : ""}
              rel="noreferrer"
              className={`break-all ${
                props.href.slice(1) === current || parents.includes(props.href)
                  ? "active-section"
                  : ""
              }`}
              style={{
                marginLeft: parents.includes(props.href)
                  ? -parents.length + parents.indexOf(props.href) + 1 + "rem"
                  : "0",
                paddingLeft: parents.includes(props.href)
                  ? parents.length - parents.indexOf(props.href) + "rem"
                  : "1rem",
              }}
            >
              {props.children}
            </a>
          ),
        }}
      />
    </div>
  );
}

export default OutlineExplorer;
