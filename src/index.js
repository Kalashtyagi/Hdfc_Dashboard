import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SidebarProvider } from "./scenes/global/SidebarContext";
import { DarkProvider } from "./scenes/global/DarkBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkProvider>
      <SidebarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SidebarProvider>
    </DarkProvider>
  </React.StrictMode>
);
