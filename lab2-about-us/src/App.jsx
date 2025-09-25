import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import img1 from "./assets/img.jpeg";
import Skill from "./Skill";

library.add(fas, far, fab);

function App() {
  return (
    <div className="flex h-screen max-sm:flex-col-reverse">
      <div className="w-[30%] bg-[#494949] p-9 flex flex-col justify-between fixed top-0 left-0 h-screen max-sm:hidden">
        <div className="text-2xl uppercase text-white font-bold border-t-2 border-white   p-2">
          about me
        </div>

        <div className="flex flex-col gap-4 text-white">
          <h3 className="text-lg font-bold uppercase">Get in touch</h3>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={["fas", "envelope"]} />
            <a href="mailto:kalkadamov14@gmail.com" className="hover:underline">
              kalkadamov14@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={["fab", "linkedin"]} />
            <a
              href="https://linkedin.com/in/erkebulan"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              linkedin.com/in/erkebulan
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={["fab", "github"]} />
            <a
              href="https://github.com/kalkadam404"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              github.com/kalkadam404
            </a>
          </div>
        </div>
      </div>

      <div className="ml-[30%] flex-1 overflow-y-scroll p-8 max-sm:ml-0">
        <div className="flex flex-col gap-2 mb-8">
          <div className="text-sm text-[#6c757d] font-bold uppercase">
            WHO I AM
          </div>
          <h1 className="text-4xl text-[#6c757d] font-bold uppercase">
            &lt; About &gt;
          </h1>
          <div className="h-[1.5px] bg-[#6c757d]/20 w-[15%] mt-5" />
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <img src={img1} alt="profile" className="w-2xl rounded-lg" />
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold text-[#6c757d]">
              Hi, I'm Erkebulan 👋
            </h1>
            <p>
              A frontend developer who loves turning ideas into interactive and
              beautiful websites. I specialize in React and modern web
              technologies, focusing on clean code, usability, and performance.
              My goal is to craft applications that people enjoy using every
              day.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Skill
            icon={["fab", "js-square"]}
            title="JavaScript"
            desc="Core language of the web that I use to build dynamic and interactive applications. Confident with ES6+ features, async programming, and DOM manipulation."
          />
          <Skill
            icon={["fab", "react"]}
            title="React"
            desc="My main framework for creating modern single-page applications. I focus on reusable components, hooks, and building responsive, user-friendly UIs."
          />
          <Skill
            icon={["fab", "sass"]}
            title="Sass"
            desc="CSS preprocessor that helps me write clean, maintainable, and scalable styles. I use variables, mixins, and nesting to speed up development."
          />
          <Skill
            icon={["fab", "vuejs"]}
            title="Vue"
            desc="Another powerful JavaScript framework I enjoy working with. I use Vue for building lightweight apps and exploring different approaches to reactive UI."
          />
        </div>

        <div className="w-full flex gap-3 items-center mt-12">
          <div className="h-[1.5px] bg-[#6c757d]/30 flex-1" />
          <p className="mx-5 text-[#6c757d] font-bold text-sm w-fit">
            &lt; / About &gt;
          </p>
          <div className="h-[1.5px] bg-[#6c757d]/30 flex-1" />
        </div>
        <div className="flex gap-8 items-center justify-between mt-8 max-sm:flex-wrap">
          <div className="flex items-start gap-2">
            <FontAwesomeIcon
              icon={["fas", "mug-hot"]}
              size="2x"
              color="#f12d2d"
            />
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-[#6c757d] font-bold text-xl">1,202</p>
              <p className="text-xs uppercase text-gray-500 font-medium">
                CUPS OF COFEE
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FontAwesomeIcon icon={["fas", "code"]} size="2x" color="#f12d2d" />
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-[#6c757d] font-bold text-xl">9,234,242</p>
              <p className="text-xs uppercase text-gray-500 font-medium">
                Lines of code
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FontAwesomeIcon
              icon={["fas", "bus-alt"]}
              size="2x"
              color="#f12d2d"
            />
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-[#6c757d] font-bold text-xl">2,214</p>
              <p className="text-xs uppercase text-gray-500 font-medium">
                Buses taken
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FontAwesomeIcon
              icon={["far", "smile-wink"]}
              size="2x"
              color="#f12d2d"
            />
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-[#6c757d] font-bold text-xl">4,245</p>
              <p className="text-xs uppercase text-gray-500 font-medium">
                Awkward winks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
