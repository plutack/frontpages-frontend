import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";
import { FaGithub, FaHome, FaSearch } from "react-icons/fa";

function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-grow justify-stretch">
        <ul className="flex flex-row space-x-4">
          <li>
            <Link to="/" className="flex flex-row items-center gap-2">
              <FaHome className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/search" className="flex flex-row items-center gap-2">
              <FaSearch className="w-5 h-5" />
              <span className="hidden sm:inline">Search</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-center ">
        <ul className="flex flex-row  justify-center items-center gap-4">
          <li>
            <ModeToggle />
          </li>
          <li>
            <a
              href="https://github.com/john-doe/my-repo"
              className="flex flex-row items-center gap-2"
            >
              <FaGithub className="w-5 h-5" />
              <span className=" hidden sm:inline">Link to Repo</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
