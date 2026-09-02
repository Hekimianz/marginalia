"use client";
import { Button, Input, Label } from "@heroui/react";
import PasswordToggle from "@/src/components/auth/password-toggle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/src/app/lib/api";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const registerSchema = z.object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required")
      .max(50, "Must be under 50 characters"),
    lastName: z
      .string()
      .trim()
      .min(1, "First name is required")
      .max(50, "Must be under 50 characters"),
    username: z
      .string()
      .trim()
      .min(4, "Must be at least 4 characters")
      .max(20, "Must be under 20 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "letters, numbers, and underscores only"),
    email: z.email(),
    password: z.string().min(4, "Must be at least 4 characters"),
  });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }) => {
    setError(null);
    try {
      await register(
        data.firstName,
        data.lastName,
        data.username,
        data.email,
        data.password,
      );
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Register failed");
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex mt-8 flex-col gap-4"
      noValidate
    >
      <div className="flex justify-between">
        <div className="flex w-[45%] flex-col gap-2">
          <Label>First Name</Label>
          <Input
            type="text"
            placeholder="Albert"
            className="shadow-none rounded-xs bg-card border-border border-2 text-foreground placeholder:text-muted focus:ring-accent focus:ring-2 focus:border-transparent"
            {...form.register("firstName")}
          />
          {form.formState.errors.firstName && (
            <span className="text-accent text-sm">
              {form.formState.errors.firstName?.message}
            </span>
          )}
        </div>

        <div className="flex w-[45%] flex-col gap-2">
          <Label>Last Name</Label>
          <Input
            type="text"
            placeholder="Camus"
            className="shadow-none rounded-xs bg-card border-border border-2 text-foreground placeholder:text-muted focus:ring-accent focus:ring-2 focus:border-transparent"
            {...form.register("lastName")}
          />
          {form.formState.errors.lastName && (
            <span className="text-accent text-sm">
              {form.formState.errors.lastName?.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Username</Label>
        <Input
          type="text"
          placeholder="PapiCamus"
          className="shadow-none rounded-xs bg-card border-border border-2 text-foreground placeholder:text-muted focus:ring-accent focus:ring-2 focus:border-transparent"
          {...form.register("username")}
        />
        {form.formState.errors.username && (
          <span className="text-accent text-sm">
            {form.formState.errors.username?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="albertcamus@gmail.com"
          className="shadow-none rounded-xs bg-card border-border border-2 text-foreground placeholder:text-muted focus:ring-accent focus:ring-2 focus:border-transparent"
          {...form.register("email")}
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
        Create account
      </Button>
    </form>
  );
}
