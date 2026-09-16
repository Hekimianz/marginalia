import { Book } from "@/src/app/lib/types";
import { ChevronRight } from "@gravity-ui/icons";
import Image from "next/image";
interface ReadingSessionThumbProps {
  book: Book;
  status: string;
}
export default function ReadingSessionThumb({
  book,
  status,
}: ReadingSessionThumbProps) {
  return (
    <article className="group flex min-w-0 overflow-hidden border border-border bg-card text-start transition-colors hover:border-accent">
      <Image
        src="/book-cover-placeholder-v3.png"
        alt={book.cover ? `Cover of ${book.title}` : ""}
        width={120}
        height={180}
        className="aspect-[2/3] w-28 shrink-0 object-cover sm:w-32 md:w-32 lg:w-40 xl:w-44"
      />
      <div className="flex min-w-0 flex-1 flex-col py-3 pl-4 pr-3 lg:p-5 xl:p-6">
        <h3 className="line-clamp-2 break-words font-fraunces text-xl font-[500] leading-snug lg:text-2xl">
          {book.title}
        </h3>
        <p className="truncate text-muted">{book.author}</p>
        <span className="mt-auto self-start rounded-xs bg-accent/20 px-2 py-0.5 text-xs font-bold tracking-wide text-accent">
          {status.toUpperCase()}
        </span>
        <span className="mt-2 flex items-center gap-1 self-start text-sm transition-colors group-hover:text-accent">
          Open session <ChevronRight className="size-4" />
        </span>
      </div>
    </article>
  );
}
