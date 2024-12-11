import React from "react";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

export const AuthProviderWithLocation = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return <AuthProvider location={location}>{children}</AuthProvider>;
};
