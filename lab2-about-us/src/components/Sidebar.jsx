import {
  Mail,
  Linkedin,
  Github,
  Home,
  User,
  Film,
  LogIn,
  LogOut,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Sidebar({ isLoggedIn = false, onLogout }) {
  return (
    <div className="w-[20%] bg-gradient-to-b from-[#1e2538] to-[#151a2b] p-8 flex flex-col justify-between fixed top-0 left-0 h-screen max-sm:hidden shadow-2xl">
      <div className="flex flex-col gap-2">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">KinoArea</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>

        <NavLink to="/" icon={<Home size={20} />} text="Home" />
        <NavLink to="/about" icon={<User size={20} />} text="About Me" />
        <NavLink to="/movies" icon={<Film size={20} />} text="Movie List" />
        <div className="mt-4 pt-4 border-t border-gray-700">
          {!isLoggedIn ? (
            <>
              <NavLink to="/login" icon={<LogIn size={20} />} text="Login" />
              <NavLink
                to="/signup"
                icon={<UserPlus size={20} />}
                text="Sign Up"
              />
            </>
          ) : (
            <>
              <NavLink to="/profile" icon={<User size={20} />} text="Profile" />
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200 group"
              >
                <span className="text-red-400 group-hover:text-red-300 transition-colors">
                  <LogOut size={20} />
                </span>
                <span className="font-medium">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Get in Touch
        </h3>

        <ContactLink
          icon={<Mail size={18} />}
          href="mailto:kalkadamov14@gmail.com"
          text="Email Me"
        />

        <ContactLink
          icon={<Linkedin size={18} />}
          href="https://linkedin.com/in/erkebulan"
          text="LinkedIn"
        />

        <ContactLink
          icon={<Github size={18} />}
          href="https://github.com/kalkadam404"
          text="GitHub"
        />
      </div>
    </div>
  );
}

function NavLink({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 group"
    >
      <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
        {icon}
      </span>
      <span className="font-medium capitalize">{text}</span>
    </Link>
  );
}

function ContactLink({ icon, href, text }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
    >
      <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
        {icon}
      </span>
      <span className="text-sm group-hover:translate-x-1 transition-transform duration-200">
        {text}
      </span>
    </a>
  );
}
