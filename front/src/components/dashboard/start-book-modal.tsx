import {
  createReadingSession,
  importOpenLibraryBook,
  searchBooks,
} from "@/src/app/lib/api";
import { ReadingSession } from "@/src/app/lib/types";
import { Magnifier, Xmark } from "@gravity-ui/icons";
import { Button, InputGroup, Label, Modal } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import type { BookSearchResult } from "@/src/app/lib/types";
import { BookResult } from "./book-result";

interface StartBookModalProps {
  onSessionCreated: (session: ReadingSession) => void;
}

type SelectionState =
  | { status: "idle" }
  | { status: "pending"; key: string }
  | { status: "error"; key: string; message: string };

export default function StartBookModal({
  onSessionCreated,
}: StartBookModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<BookSearchResult[] | null>(null);
  const [selectionState, setSelectionState] = useState<SelectionState>({
    status: "idle",
  });

  const searchSchema = z.object({
    query: z
      .string()
      .trim()
      .min(3, "Search query must be at least 3 characters long"),
  });
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
  });

  const query = useWatch({ control: form.control, name: "query" });
  async function handleBookSelect(book: BookSearchResult) {
    const key = getBookKey(book);

    setSelectionState({ status: "pending", key });
    let bookId: string;
    try {
      if (book.source === "local") {
        bookId = book.localBookId;
      } else {
        const importedBook = await importOpenLibraryBook(book);
        bookId = importedBook.id;
      }
      const session = await createReadingSession(bookId);
      onSessionCreated(session);
      form.reset();
      setSelectionState({ status: "idle" });
      setResults(null);
      setError(null);
    } catch (err) {
      setSelectionState({
        status: "error",
        key,
        message:
          err instanceof Error ? err.message : "Could not start reading book",
      });
    }
  }
  const onSubmit = async (data: { query: string }) => {
    setError(null);
    setResults(null);
    try {
      const res = await searchBooks(data.query);
      setResults(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    }
  };

  function getBookKey(book: BookSearchResult) {
    return book.source === "local"
      ? `local:${book.localBookId}`
      : `openLibrary:${book.openLibraryWorkId}`;
  }
  const isSelectionPending = selectionState.status === "pending";
  return (
    <Modal.Backdrop
      isDismissable={!isSelectionPending}
      isKeyboardDismissDisabled={isSelectionPending}
    >
      <Modal.Container placement="center" size="lg" scroll="inside">
        <Modal.Dialog
          aria-describedby="start-book-description"
          className="rounded-xs border border-border bg-card shadow-none"
        >
          {() => (
            <>
              <Modal.CloseTrigger
                isDisabled={isSelectionPending}
                className="rounded-xs bg-transparent text-muted hover:bg-accent/10 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
              />

              <Modal.Header className="border-b border-border px-5 py-5 sm:px-6 sm:py-6">
                <Modal.Heading className="font-fraunces text-2xl font-[500] leading-tight sm:text-3xl">
                  Start a book
                </Modal.Heading>
                <p
                  id="start-book-description"
                  className="mt-1 max-w-prose text-sm leading-relaxed text-muted sm:text-base"
                >
                  Search through our database for a book to begin a reading
                  session.
                </p>
              </Modal.Header>

              <Modal.Body className="px-5 pb-5 sm:px-6 sm:pb-6">
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  noValidate
                  className="mt-5 flex flex-col gap-3 rounded-xs border border-border bg-background p-3 sm:p-4"
                >
                  <Label
                    htmlFor="book-search"
                    className="text-xs font-medium tracking-wide text-muted"
                  >
                    Search by title, author, or ISBN
                  </Label>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
                    <InputGroup className="h-12 rounded-xs border border-border bg-card shadow-none sm:flex-1">
                      <InputGroup.Prefix className="pl-3 text-muted">
                        <Magnifier aria-hidden="true" className="size-4" />
                      </InputGroup.Prefix>

                      <InputGroup.Input
                        {...form.register("query")}
                        id="book-search"
                        type="search"
                        placeholder="The Stranger"
                        className="text-foreground placeholder:text-muted [&::-webkit-search-cancel-button]:appearance-none"
                      />
                      {query && (
                        <InputGroup.Suffix className="pr-2">
                          <button
                            type="button"
                            aria-label="Clear search"
                            onClick={() => {
                              form.setValue("query", "", {
                                shouldDirty: true,
                                shouldValidate: false,
                              });
                              form.clearErrors("query");
                            }}
                            className="flex size-7 cursor-pointer items-center justify-center rounded-xs bg-transparent text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                          >
                            <Xmark aria-hidden="true" className="size-4" />
                          </button>
                        </InputGroup.Suffix>
                      )}
                    </InputGroup>
                    <Button
                      type="submit"
                      isDisabled={form.formState.isSubmitting}
                      className="h-12 w-full cursor-pointer rounded-xs bg-accent px-6 font-medium text-white transition-all hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-32"
                    >
                      {form.formState.isSubmitting ? "Searching..." : "Search"}
                    </Button>
                  </div>
                  {form.formState.errors.query && (
                    <span
                      role="alert"
                      className="rounded-xs border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-accent"
                    >
                      {form.formState.errors.query?.message}
                    </span>
                  )}
                  {error && (
                    <span
                      role="alert"
                      className="rounded-xs border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-accent"
                    >
                      {error}
                    </span>
                  )}
                  {results !== null && results.length === 0 && (
                    <p
                      role="status"
                      className="rounded-xs border border-border bg-card px-3 py-3 text-center text-sm text-muted"
                    >
                      No books found. Try another title or author.
                    </p>
                  )}
                </form>
                {results !== null && results.length !== 0 && (
                  <div className="mt-6 flex flex-col gap-3">
                    <div className="flex w-full items-center justify-between gap-4">
                      <h3 className="font-fraunces text-lg font-[500] sm:text-xl">
                        Results
                      </h3>
                      <span className="shrink-0 rounded-xs border border-border bg-background px-2 py-1 text-xs font-medium tracking-wide text-muted">
                        {results.length}{" "}
                        {results.length === 1 ? "match" : "matches"}
                      </span>
                    </div>
                    <div className="flex w-full flex-col gap-3">
                      {results.map((book) => {
                        const bookKey = getBookKey(book);
                        return (
                          <BookResult
                            key={bookKey}
                            result={book}
                            onSelect={() => handleBookSelect(book)}
                            isDisabled={selectionState.status === "pending"}
                            isPending={
                              selectionState.status === "pending" &&
                              bookKey === selectionState.key
                            }
                            error={
                              selectionState.status === "error" &&
                              bookKey === selectionState.key
                                ? selectionState.message
                                : null
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </Modal.Body>
            </>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
