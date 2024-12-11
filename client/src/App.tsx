import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProviderWithLocation } from "./context/AuthProviderWithLocation";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import YourInfo from "./pages/YourInfo";

export default function App() {
  return (
    <Router>
      <AuthProviderWithLocation>
        <Routes>
          {/* Public Route */}
          <Route path="/auth" element={<Auth />} />
          {/* Protected Route */}
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/your-info" element={<YourInfo />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProviderWithLocation>
    </Router>
  );
}
