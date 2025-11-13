import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";

export const MainLayout = () => {
  return (
    <div className="flex h-screen max-sm:flex-col-reverse">
      <Sidebar />
      <div className="ml-[20%] w-[80%]  overflow-auto max-sm:w-full max-sm:ml-0.5">
        <Outlet />
      </div>
    </div>
  );
};
