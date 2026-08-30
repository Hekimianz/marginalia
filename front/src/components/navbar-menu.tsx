import { Button } from "@heroui/react";
import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";

export default function NavbarMobileMenu({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  return (
    <div className="bg-card flex flex-col py-4 border-t border-border md:hidden">
      <ul className="flex flex-col gap-4 text-start w-full">
        <li className="border-b border-border mx-4 pb-4">
          <a href="#loop" onClick={onNavigate}>
            The loop
          </a>
        </li>
        <li className="border-b border-border mx-4 pb-4">
          <a href="#questions" onClick={onNavigate}>
            Questions
          </a>
        </li>
      </ul>
      <div className="flex gap-3 justify-between px-4 pt-4">
        <Link href="/login" className="w-full">
          <Button
            className="w-full border-2 text-foreground rounded-xs bg-transparent border border-border"
            size="lg"
          >
            Log in
          </Button>
        </Link>
        <Link href="/sign-up" className="w-full">
          <Button
            className="w-full rounded-xs bg-accent border border-border "
            size="lg"
          >
            Sign up
          </Button>
        </Link>
        <ThemeSwitcher className="size-11 shrink-0" />
      </div>
    </div>
  );
}
