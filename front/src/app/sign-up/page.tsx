import RegisterForm from "@/src/components/auth/register-form";
import { ArrowLeft } from "@gravity-ui/icons";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen md:items-center md:justify-center md:bg-background p-0 md:p-6">
      <section className="flex-1 w-full bg-card p-6 md:flex-none md:max-w-md md:rounded-xs md:border md:border-border">
        <h1 className="text-2xl font-fraunces max-w-70">
          Make a home for your marginalia.
        </h1>
        <span className="mt-2 block font-light text-muted">
          One account, as many books going at once as you like.
        </span>

        <RegisterForm />

        <p className="font-light text-muted mt-8">
          Already reading with us?{" "}
          <Link
            href="/login"
            className="text-accent/80 underline hover:text-accent transition-all"
          >
            Log in
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
