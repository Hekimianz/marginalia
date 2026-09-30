"use client";
import type { BookSearchResult } from "@/src/app/lib/types";
import { ChevronRight } from "@gravity-ui/icons";
import { Button, Skeleton } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";

interface BookResultProps {
  result: BookSearchResult;
}
export function BookResult({ result }: BookResultProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  return (
    <article className="group flex w-full flex-col gap-4 rounded-xs border border-border bg-background p-3 transition-colors hover:border-accent sm:flex-row sm:items-stretch sm:gap-5 sm:p-4">
      <div className="relative aspect-[2/3] w-28 shrink-0 overflow-hidden rounded-xs border border-border bg-card sm:w-24 md:w-28">
        {isImageLoading && (
          <Skeleton
            aria-hidden="true"
            className="absolute inset-0 rounded-xs"
          />
        )}

        <Image
          src={result.cover ?? "/book-cover-placeholder-v3.png"}
          alt={result.cover ? `Cover of ${result.title}` : ""}
          fill
          sizes="(min-width: 768px) 112px, (min-width: 640px) 96px, 112px"
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
          className={`object-cover transition-opacity duration-300 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col py-0.5">
        <h4 className="line-clamp-2 break-words font-fraunces text-lg font-[500] leading-snug text-foreground sm:text-xl">
          {result.title}
        </h4>
        <p className="mt-1 line-clamp-2 break-words text-sm text-muted sm:text-base">
          {result.author}
        </p>
        <Button
          type="button"
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1 rounded-xs border border-accent/50 bg-card text-center font-medium text-accent shadow-none transition-all hover:border-accent hover:bg-accent hover:text-white sm:mt-auto sm:w-fit sm:min-w-36 sm:self-start"
        >
          Start reading <ChevronRight aria-hidden="true" className="size-4" />
        </Button>
      </div>
    </article>
  );
}
