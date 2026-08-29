import { Button, Input, Label } from "@heroui/react";
import Link from "next/link";
export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center pt-12 mx-8 min-h-screen">
      <h1 className="font-fraunces text-4xl italic font-bold border-b border-accent">
        Marginalia<span className="text-accent">.</span>
      </h1>
      <p className="mt-12 font-fraunces text-2xl  text-center px-2">
        Create your library.
      </p>
      <form
        className="bg-card flex flex-col gap-4 px-10 py-8 rounded mt-8 w-full max-w-sm"
        noValidate
      >
        <Label htmlFor="username">Username</Label>
        <Input
          name="username"
          type="text"
          id="username"
          placeholder="BigDaddyCamus"
          className="font-fraunces text-foreground placeholder-muted bg-background hover:bg-card hover:ring-2 hover:ring-border outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-border transition-all"
        />
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          type="email"
          id="email"
          placeholder="albertcamus@gmail.com"
          className="font-fraunces text-foreground placeholder-muted bg-background hover:bg-card hover:ring-2 hover:ring-border outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-border transition-all"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          name="password"
          id="password"
          placeholder="************"
          type="password"
          className="font-fraunces text-foreground placeholder-muted bg-background hover:bg-card hover:ring-2 hover:ring-border outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-border transition-all"
        />
        <Button
          type="submit"
          className="mt-2 w-full self-center bg-muted hover:bg-accent focus:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-border transition-all"
        >
          Sign Up
        </Button>
        <p className="mt-2 font-light self-center text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-accent hover:font-normal transition-all"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
