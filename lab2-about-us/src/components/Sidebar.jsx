import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
export function Sidebar() {
  return (
    <div className="w-[20%] bg-[#494949] p-9 flex flex-col justify-between fixed top-0 left-0 h-screen max-sm:hidden">
      <div className="flex flex-col gap-3 text-2xl uppercase text-white font-bold border-t-2 border-white   p-2">
        <Link to={"/"}>Home </Link>
        <Link to="/about">about me</Link>
        <Link to="/movies">Movie List</Link>
        <Link to="/login">Login</Link>
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
  );
}
