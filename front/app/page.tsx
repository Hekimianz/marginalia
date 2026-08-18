import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-6 text-center">
      <Image
        src="/Logo.png"
        height={400}
        width={400}
        sizes="(min-width: 768px) 20rem, (min-width: 640px) 16rem, 12rem"
        className="h-auto w-48 sm:w-64 md:w-80"
        alt="marginalia"
        priority
      />
      <p className="font-fraunces mt-6 max-w-sm text-lg sm:mt-8 sm:max-w-md sm:text-xl md:mt-10 md:text-2xl">
        We are currently in development{" "}
        <span className="highlight-red font-bold">&lt;3</span>
      </p>
    </div>
  );
}
