import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { useAuth } from "./context/AuthProvider";

export const MainLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen max-sm:flex-col-reverse">
      <Sidebar isLoggedIn={!!user} onLogout={logout} />
      <div className="ml-[20%] w-[80%]  overflow-auto max-sm:w-full max-sm:ml-0.5">
        <Outlet />
      </div>
    </div>
  );
};
