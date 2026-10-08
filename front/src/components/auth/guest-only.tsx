"use client";
import { useAuth } from "@/src/app/lib/auth-context";
import Loader from "./loader";
import { redirect } from "next/navigation";

export default function GuestOnly({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (user) {
    redirect("/");
  }
  return children;
}
