import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  async create(title: string, author: string): Promise<Book> {
    return await this.booksRepository.create(title, author);
  }

  async fetchAll(): Promise<Book[]> {
    return await this.booksRepository.fetchAll();
  }

  async validateBookById(id: string): Promise<Book> {
    const book = await this.booksRepository.fetchByIdOrNull(id);
    if (!book) throw new NotFoundException('No book found with given id');
    return book;
  }
}
