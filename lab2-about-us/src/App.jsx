import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About } from "./components/About";
import { SomethingList } from "./components/SomethingList";
import { MainLayout } from "./layout";

library.add(fas, far, fab);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<About />} />
          <Route path="/something" element={<SomethingList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
