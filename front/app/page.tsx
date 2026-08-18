import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        src="/Logo.png"
        height={400}
        width={400}
        className="h-auto w-auto"
        alt="marginalia"
        priority
      />
      <p className="text-center font-fraunces mt-10 text-2xl ">
        We are currently in development{" "}
        <span className="highlight-red font-bold">&lt;3</span>
      </p>
    </div>
  );
}
