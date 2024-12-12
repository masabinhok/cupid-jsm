import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProviderWithLocation } from "./context/AuthProviderWithLocation";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import YourInfo from "./pages/YourInfo";
import { FormProvider } from "./context/FormContext";

export default function App() {
  return (
    <Router>
      <AuthProviderWithLocation>
        <Routes>
          {/* Public Route */}
          <Route path="/auth" element={<Auth />} />

          {/* Protected Routes */}
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/your-info"
              element={
                <FormProvider>
                  <YourInfo />
                </FormProvider>
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProviderWithLocation>
    </Router>
  );
}
