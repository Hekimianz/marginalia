import Image from "next/image";

export default function DashboardEmpty() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 pb-16 pt-8 text-center md:border md:border-border md:py-12 lg:py-16">
      <Image
        src="/open-book.png"
        alt=""
        width={1256}
        height={672}
        className="h-auto w-52 sm:w-60 md:w-64 lg:w-72"
      />
      <h2 className="pt-2 font-fraunces text-xl font-[500] md:text-2xl">
        Your shelf is waiting
      </h2>
      <p className="max-w-md px-4 text-muted md:text-lg">
        Start a book to collect notes, passages, and reflections as you read.
      </p>
    </div>
  );
}
