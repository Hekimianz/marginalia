import { Button } from "@heroui/react";
import Link from "next/link";

export default function NavbarMobileMenu() {
  return (
    <div className="bg-card flex flex-col py-4 border-t border-border md:hidden">
      <ul className="flex flex-col gap-4 text-start w-full">
        <li className="border-b border-border mx-4 pb-4">The loop</li>
        <li className="border-b border-border mx-4 pb-4">Questions</li>
      </ul>
      <div className="flex gap-5 justify-between px-4 pt-4">
        <Link href="/login" className="w-50">
          <Button
            className="w-full border-2 text-foreground rounded-xs bg-transparent border border-border"
            size="lg"
          >
            Log in
          </Button>
        </Link>
        <Link href="/sign-up" className="w-50">
          <Button
            className="w-full rounded-xs bg-accent border border-border "
            size="lg"
          >
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
}
