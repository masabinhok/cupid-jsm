import { createContext, useState, useEffect, ReactNode, useContext } from "react";

export interface IUser {
  email: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  middleName?: string | null;
  profilePicture: string | null;
  phone?: string | null;
  bio?: string | null;
  interests?: string[] | null;
  location: {
    city: string | null;
    country: string | null;
    coordinates: [number, number] | null;
  }
  preferenceGender?: string | null;
  preferenceAgeRange?: { min: number; max: number } | null;
  preferenceDistance?: number | null;
  preferenceCaste?: string[] | null;
  preferenceInterest?: string[] | null;
  socialLinks?: string[] | null;
  _id: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: IUser | null;
  handleLogout: () => void;
  isSessionChecked: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  handleLogout: () => { },
  isSessionChecked: false,
  setIsAuthenticated: () => { },
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
  location: { pathname: string };
}

export const AuthProvider = ({ children, location }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isSessionChecked, setIsSessionChecked] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const publicRoutes = ["/auth",];

    if (publicRoutes.includes(location.pathname)) {
      setIsSessionChecked(true);
      return;
    }

    const checkSession = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/session`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Unauthorized");
        }

        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
        setUser(data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        console.error(error);
      } finally {
        setIsSessionChecked(true);
      }
    };

    checkSession();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        handleLogout,
        isSessionChecked,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
