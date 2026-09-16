"use client";
import Loader from "../components/auth/loader";
import DashboardHome from "../components/dashboard/dashboard-home";
import LandingHome from "../components/landing/landing-home";
import { useAuth } from "./lib/auth-context";

export default function Home() {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  return user ? <DashboardHome user={user} /> : <LandingHome />;
}
