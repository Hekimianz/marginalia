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
    const localResults = await this.booksRepository.searchByTitle(query);
    if (localResults.length)
      return localResults.map<BookSearchResult>((result) => ({
        source: 'local',
        localBookId: result.id,
        title: result.title,
        author: result.author,
        cover: result.cover,
      }));

    return await this.openLibraryService.searchBooks(query);
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
