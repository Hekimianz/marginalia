import { ReadingSession } from "@/src/app/lib/types";
import ReadingSessionThumb from "./reading-session";

export default function DashboardSessions({
  sessions,
}: {
  sessions: ReadingSession[];
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:gap-6">
      {sessions.map((session) => (
        <ReadingSessionThumb
          key={session.id}
          book={session.book}
          status={session.status}
        />
      ))}
    </div>
  );
}
