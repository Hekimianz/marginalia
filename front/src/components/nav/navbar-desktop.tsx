import { Button, Avatar } from "@heroui/react";
import Link from "next/link";
import ThemeSwitcher from "@/src/components/theme-switcher";
import { useAuth } from "@/src/app/lib/auth-context";
import { redirect } from "next/navigation";

export default function NavbarDesktop() {
  const { user, loading } = useAuth();
  console.log(user);
  return (
    <div className="hidden md:flex items-center">
      <ul className="flex gap-4 text-start items-center w-full font-light">
        <li>
          <a
            href="#loop"
            className="hover:text-accent cursor-pointer hover:font-[500] transition-all"
          >
            The loop
          </a>
        </li>
        <li>
          <a
            href="#questions"
            className="hover:text-accent cursor-pointer hover:font-[500] transition-all"
          >
            Questions
          </a>
        </li>
        {loading ? (
          <></>
        ) : !user ? (
          <>
            <Link href="/login">
              <Button className="rounded-xs bg-transparent text-foreground border-border border-2 hover:text-accent transition-text">
                Log in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="rounded-xs bg-accent hover:brightness-90 transition-all">
                Sign up
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Avatar
              className="rounded-xs border-2 border-border cursor-pointer"
              onClick={() => redirect("/settings")}
            >
              <Avatar.Image
                src={user.avatar ?? undefined}
                alt={user.username}
              />
              <Avatar.Fallback className="bg-card text-accent hover:bg-background">
                {user.firstName[0] + user.lastName[0]}
              </Avatar.Fallback>
            </Avatar>
          </>
        )}
        <ThemeSwitcher />
      </ul>
    </div>
  );
}
