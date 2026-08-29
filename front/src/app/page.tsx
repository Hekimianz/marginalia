import { Button } from "@heroui/react";
import Navbar from "../components/navbar";
import { ArrowRight } from "@gravity-ui/icons";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center text-foreground min-h-screen ">
      <Navbar />
      <section className="relative w-full flex flex-col gap-4 p-4 pb-8 md:p-8 justify-start md:px-16 ">
        <div className="border-border border-b">
          <h1 className="font-fraunces text-3xl text-start w-60 mt-5 pb-8 md:w-full md:text-5xl lg:w-[70%] lg:text-8xl">
            The best part of a book is what you write in the{" "}
            <span className="italic underline decoration-accent decoration-1 underline-offset-4">
              margins
            </span>
            .
          </h1>
        </div>
        <div className="flex flex-col gap-10 md:flex-row lg:w-[70%] lg:mt-8">
          <p className="text-muted text-start font-light md:w-[50%] lg:text-xl ">
            Most reading apps treat a book as a checkbox. You mark it read,
            leave a star, move on. Marginalia is built for what happens while
            you read: chapter notes, saved passages, a synthesis that grows as
            you go. Other readers follow along and reply in the margins with
            you.
          </p>
          <div className="flex flex-col gap-4 w-full md:w-[50%]">
            <Button className="rounded-xs bg-accent w-full justify-start md:p-6 lg:p-8 lg:text-lg">
              Create an account <ArrowRight />
            </Button>
            <Button className="rounded-xs text-foreground w-full bg-transparent justify-start border-border border-2 md:p-6 lg:p-8 lg:text-lg">
              I already have an account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
