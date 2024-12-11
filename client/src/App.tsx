import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProviderWithLocation } from "./context/AuthProviderWithLocation";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Profile from "./pages/YourInfo";

export default function App() {
  return (
    <Router>
      <AuthProviderWithLocation>
        <Routes>
          {/* Public Route */}
          <Route path="/auth" element={<Auth />} />
          {/* Protected Route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/your-info" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProviderWithLocation>
    </Router>
  );
}
