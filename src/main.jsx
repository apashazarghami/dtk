import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import AuthenticateProvider from "./context/AuthenticateProvider.jsx";
import AssetsProvider from "./context/AssetsProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticateProvider>
        <AssetsProvider>
          <App />
        </AssetsProvider>
      </AuthenticateProvider>
    </BrowserRouter>
  </React.StrictMode>
);
