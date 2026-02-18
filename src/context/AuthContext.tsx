import { createContext, useContext, useMemo, useState, useEffect } from "react";
import api from "../services/api";

export type UserTier = "standard" | "gold" | "platinum";

export type User = {
  id: string;
  email: string;
  tier: UserTier;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  login: (
    email: string,
    password: string,
    options?: { rememberMe?: boolean }
  ) => Promise<void>;
  signup: (payload: {
    email: string;
    password: string;
    companyName: string;
    licenseNumber: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const tokenKey = "auth_token";
  const readStoredToken = () =>
    localStorage.getItem(tokenKey) ?? sessionStorage.getItem(tokenKey);
  const persistToken = (nextToken: string, rememberMe: boolean) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    const otherStorage = rememberMe ? sessionStorage : localStorage;
    storage.setItem(tokenKey, nextToken);
    otherStorage.removeItem(tokenKey);
  };

  const [token, setToken] = useState<string | null>(readStoredToken());
  const [user, setUser] = useState<User | null>(null);

  // Attach token to axios automatically
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (
    email: string,
    password: string,
    options?: { rememberMe?: boolean }
  ) => {
    const rememberMe = options?.rememberMe ?? true;
    const { data } = await api.post<{ token: string; user: User }>(
      "/auth/login",
      { email, password, rememberMe }
    );

    persistToken(data.token, rememberMe);
    setToken(data.token);
    setUser(data.user);
  };

  const signup = async (payload: {
    email: string;
    password: string;
    companyName: string;
    licenseNumber: string;
  }) => {
    const { data } = await api.post<{ token: string; user: User }>(
      "/auth/signup",
      payload
    );

    persistToken(data.token, true);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem(tokenKey);
    sessionStorage.removeItem(tokenKey);
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      signup,
      logout,
      isAuthenticated: !!token,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 🔥 Use consistent hook name
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// Backward-compatible export for existing imports
export const useAuthContext = useAuth;
