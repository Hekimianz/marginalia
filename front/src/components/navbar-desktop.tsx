import { Button } from "@heroui/react";
import Link from "next/link";

export default function NavbarDesktop() {
  return (
    <div className="hidden md:flex items-center">
      <ul className="flex gap-4 text-start items-center w-full font-light">
        <li className="hover:text-accent cursor-pointer hover:font-[500] transition-all transition-all">
          The loop
        </li>
        <li className="hover:text-accent cursor-pointer hover:font-[500] transition-all">
          Questions
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
      </ul>
    </div>
  );
}
