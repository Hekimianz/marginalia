import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dtos/create-book.dto';
import {
  OpenLibraryBookResult,
  OpenLibraryService,
} from './open-library.service';
import { ImportOpenLibraryBookDto } from './dtos/import-open-library-book.dto';

interface LocalBookResult {
  source: 'local';
  localBookId: string;
  title: string;
  author: string;
  cover: string | null;
}

export type BookSearchResult = LocalBookResult | OpenLibraryBookResult;

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly openLibraryService: OpenLibraryService,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return await this.booksRepository.create(createBookDto);
  }

  async fetchAll(): Promise<Book[]> {
    return await this.booksRepository.fetchAll();
  }

  async validateBookById(id: string): Promise<Book> {
    const book = await this.booksRepository.fetchByIdOrNull(id);
    if (!book) throw new NotFoundException('No book found with given id');
    return book;
  }

  async searchBooks(query: string): Promise<BookSearchResult[]> {
    const PAGE_SIZE = 10;
    const localBooks = await this.booksRepository.searchByTitleOrAuthor(query);
    const localResults = localBooks.map<LocalBookResult>((book) => ({
      source: 'local',
      localBookId: book.id,
      title: book.title,
      author: book.author,
      cover: book.cover,
    }));

    if (localResults.length >= PAGE_SIZE) {
      return localResults.slice(0, PAGE_SIZE);
    }

    const seenOpenLibraryWorkIds = new Set(
      localBooks.flatMap((book) =>
        book.openLibraryWorkId ? [book.openLibraryWorkId] : [],
      ),
    );
    const externalCandidates = await this.openLibraryService.searchBooks(query);
    const remainingSlots = PAGE_SIZE - localResults.length;
    const externalResults = externalCandidates
      .filter((result) => {
        if (seenOpenLibraryWorkIds.has(result.openLibraryWorkId)) return false;
        seenOpenLibraryWorkIds.add(result.openLibraryWorkId);
        return true;
      })
      .slice(0, remainingSlots);

    return [...localResults, ...externalResults];
  }

  async findOrCreateOpenLibraryBook(
    importOpenLibraryBookDto: ImportOpenLibraryBookDto,
  ): Promise<Book> {
    const foundBook = await this.booksRepository.fetchByOpenLibraryWorkIdOrNull(
      importOpenLibraryBookDto.openLibraryWorkId,
    );
    if (!foundBook)
      return await this.booksRepository.createBookFromOpenLibrary(
        importOpenLibraryBookDto,
      );
    return foundBook;
  }
}
