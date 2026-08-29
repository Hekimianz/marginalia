import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center text-foreground min-h-screen pt-12">
      <h1 className="font-fraunces text-4xl italic font-bold border-b border-accent">
        Marginalia<span className="text-accent">.</span>
      </h1>
      <p className="font-fraunces max-w-sm text-lg mt-12 sm:max-w-md sm:text-xl md:text-2xl">
        We are currently in development{" "}
        <span className="text-accent font-bold">&lt;3</span>
      </p>
      <p className="mt-auto mb-4 text-muted font-fraunces ">
        Created with love by{" "}
        <Link
          href="https://github.com/Hekimianz"
          target="_blank"
          className="hover:text-accent transition-all"
        >
          Aram Hekimian
        </Link>
      </p>
    </div>
  );
}
