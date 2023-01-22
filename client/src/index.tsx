import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import ExamplePage from "./pages/ExamplePage";
import ShowExample from "./pages/ShowExample";
import GetAPIKeyPage from "./pages/GetAPIKeyPage";
import DocumentationPage from "./pages/docs";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/example" element={<ExamplePage />}></Route>
        <Route path="/example/season" element={<ShowExample />}></Route>
        <Route path="/api/keys" element={<GetAPIKeyPage />}></Route>
        <Route path="/docs" element={<DocumentationPage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
