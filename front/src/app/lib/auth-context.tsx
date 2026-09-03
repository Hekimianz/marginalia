"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { User, AuthContextValue } from "./types";
import {
  apiFetch,
  logout as apiLogout,
  login as apiLogin,
  deleteAccount as apiDeleteAccount,
  getAvatarSig,
  changeAvatarUrl,
  changeNames,
} from "./api";
import { paths } from "./paths";
import { postToCloudinary } from "./cloudinary";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = () => {
    const token = localStorage.getItem("access_token");
    const userRequest = token ? apiFetch(paths.me) : Promise.resolve(null);
    return userRequest
      .then((result) => setUser(result))
      .catch(() => {
        localStorage.removeItem("access_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    await apiLogin(email, password);
    await refreshUser();
  };

  const logout = async () => {
    const refresh_token = localStorage.getItem("refresh_token");
    try {
      if (refresh_token) await apiLogout(refresh_token);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);
    }
  };

  const deleteAccount = async () => {
    await apiDeleteAccount();
    await logout();
  };

  const updateAvatar = async (file: File): Promise<void> => {
    const signature = await getAvatarSig();
    const upload = await postToCloudinary(file, signature);
    const updatedUser = await changeAvatarUrl(upload.secure_url);
    setUser(updatedUser);
  };

  const updateNames = async (firstName: string, lastName: string) => {
    const updatedUser = await changeNames({
      firstName: firstName[0].toUpperCase() + firstName.slice(1),
      lastName: lastName[0].toUpperCase() + lastName.slice(1),
    });
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        login,
        updateAvatar,
        deleteAccount,
        updateNames,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
