"use client";

import { Plus } from "@gravity-ui/icons";
import { Accordion, Key } from "@heroui/react";
import { useState } from "react";

export default function FaqAccordion() {
  const [expandedKeys, setExpandedKeys] = useState<Set<Key>>(new Set([""]));
  return (
    <Accordion
      className="w-full max-w-[768px]"
      expandedKeys={expandedKeys}
      onExpandedChange={setExpandedKeys}
    >
      <Accordion.Item id="1">
        <Accordion.Heading className="hover:text-accent">
          <Accordion.Trigger className="text-base md:text-lg lg:text-xl">
            Is this another shelf logging app?
            <Accordion.Indicator
              className={`text-accent transition-transform duration-300 ${
                expandedKeys.has("1") ? "rotate-45" : "rotate-0"
              }`}
            >
              <Plus />
            </Accordion.Indicator>
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="font-light text-start text-sm md:text-base lg:text-lg">
            No. A post here is an event: a note added, a synthesis updated, an
            underline saved. It is not a static book entry, and nothing asks you
            to mark a book read and move on.
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item id="2">
        <Accordion.Heading className="hover:text-accent">
          <Accordion.Trigger className="text-base md:text-lg lg:text-xl">
            Can I read several books at once?
            <Accordion.Indicator
              className={`text-accent transition-transform duration-300 ${
                expandedKeys.has("2") ? "rotate-45" : "rotate-0"
              }`}
            >
              <Plus />
            </Accordion.Indicator>
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="font-light text-start text-sm md:text-base lg:text-lg">
            Yes, and that is the assumption. Each book you set as Reading Now
            opens its own session, and the app never forces you down to a single
            title.
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item id="3">
        <Accordion.Heading className="hover:text-accent">
          <Accordion.Trigger className="text-base md:text-lg lg:text-xl">
            How do you know a quoted passage is real?
            <Accordion.Indicator
              className={`text-accent transition-transform duration-300 ${
                expandedKeys.has("3") ? "rotate-45" : "rotate-0"
              }`}
            >
              <Plus />
            </Accordion.Indicator>
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="font-light text-start text-sm md:text-base lg:text-lg">
            We trust readers by default and give the community tools to correct
            abuse. An underline can be reported for not actually being from the
            book, and posts past a report threshold come down.
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item id="4">
        <Accordion.Heading className="hover:text-accent">
          <Accordion.Trigger className="text-base md:text-lg lg:text-xl">
            Where do the books come from?
            <Accordion.Indicator
              className={`text-accent transition-transform duration-300 ${
                expandedKeys.has("4") ? "rotate-45" : "rotate-0"
              }`}
            >
              <Plus />
            </Accordion.Indicator>
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="font-light text-start text-sm md:text-base lg:text-lg">
            You search a large external catalogue, so you are never limited to a
            list we maintain by hand. Once you pick a book, its details and
            cover are kept by Marginalia so the app stays fast.
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item id="5">
        <Accordion.Heading className="hover:text-accent">
          <Accordion.Trigger className="text-base md:text-lg lg:text-xl">
            What is coming after the first version?
            <Accordion.Indicator
              className={`text-accent transition-transform duration-300 ${
                expandedKeys.has("5") ? "rotate-45" : "rotate-0"
              }`}
            >
              <Plus />
            </Accordion.Indicator>
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="font-light text-start text-sm md:text-base lg:text-lg">
            A reading widget on your profile, yearly reading goals, a To Read
            shelf, and genres on each book for discovery. Reporting tools and
            limits for repeat offenders land alongside them.
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
