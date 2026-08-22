import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dtos/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

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
}
