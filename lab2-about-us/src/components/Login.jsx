import React from "react";

export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-sky-50 p-6">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-sky-400 rounded-xl shadow-md">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M7 10V7a5 5 0 0110 0v3"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="3"
                y="10"
                width="18"
                height="11"
                rx="2"
                stroke="white"
                strokeWidth="1.6"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Login</h1>
            <p className="text-sm text-slate-500">
              A simple placeholder page while auth is being prepared
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg p-4 bg-slate-50 border border-dashed border-slate-200">
            <h2 className="text-lg font-medium text-slate-700">
              Auth to be added
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              We&apos;re working on signing you in. Meanwhile, this page shows
              where the authentication form will appear.
            </p>
          </div>

          <div className="grid gap-3">
            <input
              disabled
              placeholder="Email (coming soon)"
              className="w-full px-4 py-3 rounded-md bg-white border border-slate-200 text-slate-700 placeholder:text-slate-400"
            />
            <input
              disabled
              placeholder="Password (coming soon)"
              type="password"
              className="w-full px-4 py-3 rounded-md bg-white border border-slate-200 text-slate-700 placeholder:text-slate-400"
            />
            <button
              disabled
              className="w-full py-3 rounded-md bg-gradient-to-r from-indigo-400 to-sky-400 text-white font-medium shadow-md opacity-60 cursor-not-allowed"
            >
              Sign in (coming soon)
            </button>
          </div>

          <div className="mt-3 text-center text-sm text-slate-500">
            <span>Prefer to try the app? </span>
            <span className="font-medium text-slate-700">
              Demo mode available
            </span>
          </div>
        </div>

        <div className="mt-6 text-xs text-center text-slate-400">
          Need this wired to your router? I can add a proper route (React Router
          / Next.js) and real auth when you're ready.
        </div>
      </div>
    </div>
  );
}
