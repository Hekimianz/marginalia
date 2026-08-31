"use client";
import { Button, Input, Label } from "@heroui/react";
import PasswordToggle from "@/src/components/auth/password-toggle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/src/app/lib/auth-context";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(4, "password is required"),
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: { email: string; password: string }) => {
    setError(null);
    try {
      await login(data.email, data.password);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex mt-8 flex-col gap-4"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          {...form.register("email")}
          type="email"
          placeholder="albertcamus@gmail.com"
          className="shadow-none rounded-xs bg-card border-border border-2 text-foreground placeholder:text-muted focus:ring-accent focus:ring-2 focus:border-transparent"
        />
        {form.formState.errors.email && (
          <span className="text-accent text-sm">
            {form.formState.errors.email?.message}
          </span>
        )}
      </div>

      <PasswordToggle
        registration={form.register("password")}
        error={form.formState.errors.password?.message}
      />
      {error && <span className="text-accent text-sm">{error}</span>}
      <Button
        type="submit"
        className="bg-accent rounded-xs w-full justify-start py-6 hover:brightness-90 transition-all cursor-pointer"
      >
        Log in
      </Button>
    </form>
  );
}
