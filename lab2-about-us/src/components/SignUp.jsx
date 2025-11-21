import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate("/profile");
  }
  const register = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error.message);
        setError("Failed to sign up. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="relative bg-[#191E2E] size-full flex flex-col items-center  gap-5 justify-center">
      <div className="text-white font-bold text-4xl mb-5 max-sm:text-2xl">
        Зарегистрироваться
      </div>
      <div className="flex flex-col items-start gap-4 max-sm:items-center">
        <div className="flex flex-col items-start gap-4">
          {/* <input
            type="text"
            placeholder="Имя"
            className="bg-[#1E2538] text-white placeholder-gray-500 pl-7 w-96 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#F2F60F] transition-all max-sm:w-72 max-sm:text-base"
          />
          <input
            type="text"
            placeholder="Фамилия"
            className="bg-[#1E2538] text-white placeholder-gray-500 pl-7 w-96 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#F2F60F] transition-all max-sm:w-72 max-sm:text-base"
          /> */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="bg-[#1E2538] text-white placeholder-gray-500 pl-7 w-96 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#F2F60F] transition-all max-sm:w-72 max-sm:text-base"
          />
          <input
            type="text"
            placeholder="username"
            className="bg-[#1E2538] text-white placeholder-gray-500 pl-7 w-96 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#F2F60F] transition-all max-sm:w-72 max-sm:text-base"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="bg-[#1E2538] text-white placeholder-gray-500 pl-7 w-96 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#F2F60F] transition-all max-sm:w-72 max-sm:text-base"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Please repeat your password"
            className="bg-[#1E2538] text-white placeholder-gray-500 pl-7 w-96 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#F2F60F] transition-all max-sm:w-72 max-sm:text-base"
          />
        </div>
        <div className="flex flex-col items-start gap-4 max-sm:gap-2">
          <div className="flex items-center gap-3">
            <div>
              <label className="relative flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-5 h-5 rounded-md border-2 border-gray-400 peer-checked:bg-[#F2F60F] peer-checked:border-[#F2F60F] flex items-center justify-center transition-all">
                  <img src="/yes.svg" alt="" width="13px" height="13px" />
                </div>
              </label>
            </div>
            <p className="text-xs text-white max-sm:text-[10px]">
              I consent to the processing of my personal data.
            </p>
          </div>
        </div>
      </div>
      <button
        className="bg-[#F2F60F] py-4 w-96 rounded-xl text-lg text-[#191E2E] font-bold hover:bg-yellow-400 transition-all max-sm:w-72 max-sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={register}
        disabled={loading}
      >
        {loading ? "loading..." : "Sign Up"}
      </button>
      {error && (
        <p className="text-red-500 font-semibold mt-2 max-sm:text-sm">
          {error}
        </p>
      )}
      <p className="text-white mt-4 max-sm:text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 underline">
          Login
        </Link>
      </p>
    </div>
  );
}
