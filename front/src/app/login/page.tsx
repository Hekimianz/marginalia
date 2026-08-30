import PasswordToggle from "@/src/components/password-toggle";
import { ThemedImage } from "@/src/components/themed-image";
import { ArrowLeft } from "@gravity-ui/icons";
import { Button, Input, Label } from "@heroui/react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen md:items-center md:justify-center md:bg-background p-0 md:p-6">
      <section className="flex-1 w-full bg-card p-6 md:flex-none md:max-w-md md:rounded-xs md:border md:border-border ">
        <ThemedImage
          lightSrc="/icon-light.svg"
          darkSrc="/icon-dark.svg"
          alt="icon"
          width={45}
          height={45}
          loading="eager"
          className="w-[45px] h-[45px]"
        />

        <h1 className="mt-8 text-2xl font-fraunces">Welcome back.</h1>
        <span className="mt-2 block font-light text-muted">
          Pick up where your notes left off.
        </span>

        <form className="flex mt-8 flex-col gap-4" noValidate>
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="albertcamus@gmail.com"
              className="shadow-none rounded-xs bg-card border-border border-2 text-foreground placeholder:text-muted focus:ring-accent focus:ring-2 focus:border-transparent"
            />
          </div>

          <PasswordToggle />

          <Button
            type="submit"
            className="bg-accent rounded-xs w-full justify-start py-6 hover:brightness-90 transition-all cursor-pointer"
          >
            Log in
          </Button>
        </form>

        <p className="font-light text-muted mt-8">
          New here?{" "}
          <Link
            href="/sign-up"
            className="text-accent/80 underline hover:text-accent transition-all"
          >
            Create an account
          </Link>
        </p>

        <Link
          href="/"
          className="inline-flex mt-8 gap-2 items-center text-muted font-light hover:text-foreground w-fit transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-4" /> Back home
        </Link>
      </section>
    </div>
  );
}
