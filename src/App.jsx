import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import "./styles/App.css";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import React from "react";
function App() {
  const { pathname } = useLocation();

  return (
    <div className={`${pathname === "/" && "loginContainer"}`}>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
