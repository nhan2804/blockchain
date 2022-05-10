import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import CreateCharity from "./pages/charity/create";
ReactDOM.render(
  //   <CreateCharity />,
  <App />,
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<App />} />
  //       <Route path="/charity/create" element={<CreateCharity />} />
  //       <Route path="/charity" element={<HomePage />} />
  //     </Routes>
  //   </BrowserRouter>,
  document.getElementById("root")
);
