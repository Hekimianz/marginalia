import { Button } from "@heroui/react";
import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";

export default function NavbarDesktop() {
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
        <ThemeSwitcher />
      </ul>
    </div>
  );
}
