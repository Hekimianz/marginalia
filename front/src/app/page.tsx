import { Button } from "@heroui/react";
import Navbar from "../components/navbar";
import { ArrowRight } from "@gravity-ui/icons";
import FaqAccordion from "../components/faq-accordion";
import Reveal from "../components/reveal";
import RevealLine from "../components/reveal-line";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center text-foreground min-h-screen ">
      <Navbar />
      <section className="border-b-3 border-border w-full flex flex-col gap-4 p-4 pb-8 md:p-8 justify-start md:px-16 ">
        <Reveal>
          <div className="border-border border-b">
            <h1 className="font-fraunces text-3xl leading-tight md:text-5xl md:leading-tight lg:text-7xl lg:leading-none xl:text-8xl xl:leading-none text-start w-60 mt-5 pb-8 md:w-full">
              The best part of a book is what you write in the{" "}
              <span className="italic underline decoration-accent decoration-1 underline-offset-4">
                margins
              </span>
              .
            </h1>
          </div>
        </Reveal>
        <Reveal
          delay={150}
          className="flex flex-col gap-10 md:flex-row lg:w-[70%] lg:mt-8"
        >
          <p className="text-muted text-start font-light text-base leading-relaxed md:text-lg md:leading-relaxed lg:text-xl lg:leading-relaxed md:w-[50%]">
            Most reading apps treat a book as a checkbox. You mark it read,
            leave a star, move on. Marginalia is built for what happens while
            you read: chapter notes, saved passages, a synthesis that grows as
            you go. Other readers follow along and reply in the margins with
            you.
          </p>
          <div className="flex flex-col gap-4 w-full md:w-[50%]">
            <Link href="/sign-up">
              <Button className="group rounded-xs bg-accent w-full justify-start md:p-6 lg:p-8 text-base md:text-lg lg:text-xl transition-transform duration-150 active:scale-[0.98]">
                Create an account{" "}
                <ArrowRight className="inline-block transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/login">
              <Button className="rounded-xs text-foreground w-full bg-transparent justify-start border-border border-2 md:p-6 lg:p-8 text-base md:text-lg lg:text-xl transition-all duration-150 hover:border-accent hover:text-accent active:scale-[0.98]">
                I already have an account
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>

      <section
        id="loop"
        className="border-b-3 border-border w-full flex flex-col gap-4 p-4 pb-8 md:p-8 justify-start md:px-16 scroll-mt-4"
      >
        <Reveal className="flex items-center mt-4 text-start justify-between border-b border-border pb-8">
          <h2 className="font-light text-muted w-[55%] tracking-widest text-xs md:text-sm lg:text-base leading-none">
            THE CORE LOOP
          </h2>
          <RevealLine className="border-b-1 w-[45%]" />
        </Reveal>

        <div className="grid grid-cols-1 py-8 gap-y-10 md:grid-cols-2 md:gap-x-10 lg:grid-cols-4 ">
          <Reveal
            delay={0}
            className="group flex flex-col border-b border-border pb-8 text-start w-full transition-all duration-300 hover:border-accent hover:-translate-y-1"
          >
            <h3 className="text-4xl leading-none md:text-5xl md:leading-none lg:text-6xl lg:leading-none font-fraunces text-accent">
              01
            </h3>
            <h3 className="font-fraunces text-lg leading-snug md:text-xl md:leading-snug lg:text-2xl lg:leading-snug mt-5 transition-colors duration-300 group-hover:text-accent">
              Start a book
            </h3>
            <p className="text-muted text-sm leading-relaxed md:text-base md:leading-relaxed lg:text-lg lg:leading-relaxed mt-3">
              Pick something and set it as Reading Now. Several at once is fine,
              and the app never forces you down to one title.
            </p>
          </Reveal>

          <Reveal
            delay={100}
            className="group flex flex-col border-b border-border pb-8 text-start w-full transition-all duration-300 hover:border-accent hover:-translate-y-1"
          >
            <h3 className="text-4xl leading-none md:text-5xl md:leading-none lg:text-6xl lg:leading-none font-fraunces text-accent">
              02
            </h3>
            <h3 className="font-fraunces text-lg leading-snug md:text-xl md:leading-snug lg:text-2xl lg:leading-snug mt-5 transition-colors duration-300 group-hover:text-accent">
              Capture as you go
            </h3>
            <p className="text-muted text-sm leading-relaxed md:text-base md:leading-relaxed lg:text-lg lg:leading-relaxed mt-3">
              Chapter notes while the thought is fresh. Underlines for passages
              worth keeping. A synthesis you keep refining.
            </p>
          </Reveal>

          <Reveal
            delay={200}
            className="group flex flex-col border-b border-border pb-8 text-start w-full transition-all duration-300 hover:border-accent hover:-translate-y-1"
          >
            <h3 className="text-4xl leading-none md:text-5xl md:leading-none lg:text-6xl lg:leading-none font-fraunces text-accent">
              03
            </h3>
            <h3 className="font-fraunces text-lg leading-snug md:text-xl md:leading-snug lg:text-2xl lg:leading-snug mt-5 transition-colors duration-300 group-hover:text-accent">
              Close the loop
            </h3>
            <p className="text-muted text-sm leading-relaxed md:text-base md:leading-relaxed lg:text-lg lg:leading-relaxed mt-3">
              Finish the book, post a review with a rating. The verdict sits at
              the top of the book&apos;s page.
            </p>
          </Reveal>

          <Reveal
            delay={300}
            className="group flex flex-col border-b border-border pb-8 text-start w-full transition-all duration-300 hover:border-accent hover:-translate-y-1"
          >
            <h3 className="text-4xl leading-none md:text-5xl md:leading-none lg:text-6xl lg:leading-none font-fraunces text-accent">
              04
            </h3>
            <h3 className="font-fraunces text-lg leading-snug md:text-xl md:leading-snug lg:text-2xl lg:leading-snug mt-5 transition-colors duration-300 group-hover:text-accent">
              Share & connect
            </h3>
            <p className="text-muted text-sm leading-relaxed md:text-base md:leading-relaxed lg:text-lg lg:leading-relaxed mt-3">
              Followers see each new note and comment on it. You find readers
              through the books you share.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="questions"
        className="border-b-3  border-border w-full flex flex-col gap-4 p-4 py-8 md:p-8 justify-start items-center md:px-16 scroll-mt-4"
      >
        <Reveal className="w-full max-w-[768px]">
          <h2 className="font-fraunces text-xl md:text-2xl lg:text-3xl text-start border-b pb-4 border-border">
            Questions
          </h2>
        </Reveal>
        <Reveal delay={150} className="w-full max-w-[768px]">
          <FaqAccordion />
        </Reveal>
      </section>

      <section className="text-start border-b-3 border-border w-full flex flex-col gap-4 p-4 py-8 md:p-8 justify-center items-center md:flex-row md:px-16 lg:gap-30">
        <Reveal>
          <h2 className="font-fraunces text-xl md:text-2xl lg:text-3xl">
            Notes in the margins, worth sharing.
          </h2>
        </Reveal>
        <Reveal delay={150} className="flex flex-col gap-2">
          <Link href="/sign-up">
            <Button className="group rounded-xs bg-accent w-full justify-start md:p-6 lg:p-8 text-base md:text-lg lg:text-xl transition-transform duration-150 active:scale-[0.98]">
              Create an account{" "}
              <ArrowRight className="inline-block transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
          <p className="text-muted text-sm md:text-base lg:text-lg">
            Takes a minute. Bring one book you&apos;re in the middle of.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
