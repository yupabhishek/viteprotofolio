import { Analytics } from "@vercel/analytics/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import RefContextProvider from "./context/RefContextProvider";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <RefContextProvider>
      <BrowserRouter>
        <App />
        <Analytics />
      </BrowserRouter>
    </RefContextProvider>
  </StrictMode>
);
