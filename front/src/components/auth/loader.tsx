export default function Loader({
  message = "Finding your place…",
}: {
  message?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground"
    >
      <div className="flex w-full max-w-60 flex-col items-center gap-5 md:max-w-72">
        <h1 className="font-fraunces text-4xl leading-none md:text-5xl">
          marginalia<span className="text-accent">.</span>
        </h1>

        <div
          aria-hidden="true"
          className="relative h-px w-full overflow-hidden bg-border"
        >
          <div className="animate-margin-sweep absolute inset-y-0 left-0 w-1/3 bg-accent motion-reduce:w-full" />
        </div>

        <p className="font-fraunces text-base italic text-muted md:text-lg">
          {message}
        </p>
      </div>
    </div>
  );
}
