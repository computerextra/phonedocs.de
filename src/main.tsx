import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Layout from "./layout.tsx";
import Datenschutz from "./Pages/Datenschutz.tsx";
import FAQ from "./Pages/FAQ.tsx";
import Home from "./Pages/Home.tsx";
import Impressum from "./Pages/Impressum.tsx";
import Kontakt from "./Pages/Kontakt.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Kontakt" element={<Kontakt />} />
          <Route path="FAQ" element={<FAQ />} />
          <Route path="Datenschutz" element={<Datenschutz />} />
          <Route path="Impressum" element={<Impressum />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
