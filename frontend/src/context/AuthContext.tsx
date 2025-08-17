"use client"
import { createContext, useState, useEffect, ReactNode } from "react";
import API from "../services/api";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
  login: (data: any) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  login: () => {},
  logout: () => {},
  refreshAccessToken: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const savedAccess = localStorage.getItem("accessToken");
    const savedRefresh = localStorage.getItem("refreshToken");
    const savedUser = localStorage.getItem("user");
    if (savedAccess) setAccessToken(savedAccess);
    if (savedRefresh) setRefreshToken(savedRefresh);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (data: any) => {
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify({ _id: data._id, name: data.name, email: data.email, role: data.role }));
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) return logout();
    try {
      const { data } = await API.post("/auth/refresh", { token: refreshToken });
      setAccessToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, user, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
