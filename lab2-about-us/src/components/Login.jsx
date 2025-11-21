import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);
  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setEmail("");
        setPassword("");
        setError("");
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error.message);
        setError("SORRY, COULDN'T FIND YOUR ACCOUNT");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <div className="relative bg-[#191E2E] size-full flex flex-col items-center justify-center  gap-5 py-9 ">
        <div className="text-white font-bold text-4xl max-sm:text-2xl">
          Войти
        </div>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Plese enter your email"
          className="bg-[#1E2538] text-white placeholder-gray-500 pl-7 w-96 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#F2F60F] transition-all max-sm:w-72 max-sm:text-base"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Please enter your password"
          className="bg-[#1E2538] text-white placeholder-gray-500 pl-7 w-96 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#F2F60F] transition-all max-sm:w-72 max-sm:text-base"
        />

        <button
          onClick={login}
          disabled={loading}
          className="bg-[#F2F60F] py-4 w-96 rounded-xl text-lg text-[#191E2E] font-bold hover:bg-yellow-400 transition-all max-sm:w-72 max-sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "loading..." : "Login"}
        </button>
        {error && (
          <p className="text-red-500 font-semibold max-sm:text-sm">{error}</p>
        )}

        <Link to="/signup">
          <button className="bg-[#1E2538] py-4 w-96 text-white rounded-xl text-lg hover:bg-[#252E42] transition-all max-sm:w-72 max-sm:text-base">
            Sign Up
          </button>
        </Link>
      </div>
    </>
  );
}
