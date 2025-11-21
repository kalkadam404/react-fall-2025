import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About } from "./components/About";
import { MainLayout } from "./layout";
import Home from "./components/Home";
import { Login } from "./components/Login";
import { MovieList } from "./components/MovieList";
import { MovieDetail } from "./components/MovieDetail";
import { SignUp } from "./components/SignUp";
import { ProfilePage } from "./components/Profile";
import AuthProvider from "./context/AuthProvider";

library.add(fas, far, fab);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/movie/:movie_id" element={<MovieDetail />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
