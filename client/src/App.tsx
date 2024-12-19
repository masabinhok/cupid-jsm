import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProviderWithLocation } from "./context/AuthProviderWithLocation";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import YourInfo from "./pages/YourInfo";
import { FormProvider } from "./context/FormContext";
import Profile from "./pages/Profile";
import OtherProfile from "./pages/OtherProfile";
import { LikeProvider } from "./context/LikeContext";
import Message from "./pages/Message";

export default function App() {
  return (
    <Router>
      <AuthProviderWithLocation>
        <LikeProvider>
          <FormProvider>
            <Routes>
              {/* Public Route */}
              <Route path="/auth" element={<Auth />} />

              {/* Protected Routes */}
              <Route path="/" element={<Home />} />
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/your-info"
                  element={

                    <YourInfo />

                  }
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/message/:id" element={<Message />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:id" element={<OtherProfile />} />
              </Route>
            </Routes>
          </FormProvider>
        </LikeProvider>
      </AuthProviderWithLocation>
    </Router >
  );
}
