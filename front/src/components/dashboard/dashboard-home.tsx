import DashboardEmpty from "./dashboard-empty";
import type { User } from "@/src/app/lib/types";
import { Button } from "@heroui/react";
import { Plus } from "@gravity-ui/icons";
import type { ReadingSession } from "@/src/app/lib/types";
import { useEffect, useState } from "react";
import { getMySessions } from "@/src/app/lib/api";
import DashboardSessions from "./dashboard-sessions";
interface DashboardHomeProps {
  user: User;
}
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
export default function DashboardHome({ user }: DashboardHomeProps) {
  const [sessions, setSessions] = useState<ReadingSession[] | null>(null);
  const [sessionsError, setSessionsError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSessions() {
      try {
        const results = await getMySessions();
        setSessions(results);
      } catch (error) {
        setSessionsError(
          error instanceof Error
            ? error.message
            : "Could not load your sessions",
        );
      }
    }
    loadSessions();
  }, []);
  return (
    <div className="w-full px-8 pb-8 text-foreground md:px-8 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <div className="flex flex-col gap-4 border-b border-border pb-8 pt-4 text-start md:flex-row md:items-end md:justify-between md:pt-8 lg:pt-10">
          <div>
            <h2 className="font-fraunces text-3xl font-[500] md:text-4xl lg:text-5xl">
              {getGreeting()}, {user.firstName}.
            </h2>
            <p className="pt-1 text-muted md:text-lg">
              Your reading life, all in one place.
            </p>
          </div>
          <Button
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xs bg-accent py-6 text-base transition-all hover:brightness-90 md:w-auto md:min-w-44 md:px-6"
          >
            <Plus className="size-5 shrink-0" /> <span>Start a book</span>
          </Button>
        </div>
        <h1 className="w-full pt-4 text-start font-fraunces text-xl font-[500] md:text-2xl">
          Reading now
        </h1>
        {sessionsError ? (
          <p className="text-danger">{sessionsError}</p>
        ) : sessions === null ? (
          <p className="text-muted">Loading your books...</p>
        ) : sessions.length === 0 ? (
          <DashboardEmpty />
        ) : (
          <DashboardSessions sessions={sessions} />
        )}
      </div>
    </div>
  );
}
