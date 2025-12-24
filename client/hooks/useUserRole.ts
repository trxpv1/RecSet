import { useState, useEffect } from "react";

export interface AuthUser {
  email: string;
  name: string;
  role: "admin" | "user";
}

export const useUserRole = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const isAdmin = user?.role === "admin";
  const isNormalUser = user?.role === "user";

  const setAuthUser = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return {
    user,
    isLoading,
    isAdmin,
    isNormalUser,
    setAuthUser,
    logout,
  };
};
