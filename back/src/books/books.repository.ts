import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { ILike, Repository } from 'typeorm';
import { CreateBookDto } from './dtos/create-book.dto';
import { ImportOpenLibraryBookDto } from './dtos/import-open-library-book.dto';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(Book) private readonly repo: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return await this.repo.save(this.repo.create(createBookDto));
  }

  async createBookFromOpenLibrary(
    importOpenLibraryBookDto: ImportOpenLibraryBookDto,
  ): Promise<Book> {
    return await this.repo.save(this.repo.create(importOpenLibraryBookDto));
  }

  async fetchAll(): Promise<Book[]> {
    return await this.repo.find();
  }

  async fetchByIdOrNull(id: string): Promise<Book | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async searchByTitle(query: string): Promise<Book[]> {
    return await this.repo.find({
      where: { title: ILike(`%${query}%`) },
      take: 10,
    });
  }

  async fetchByOpenLibraryWorkIdOrNull(
    openLibraryWorkId: string,
  ): Promise<Book | null> {
    return await this.repo.findOne({ where: { openLibraryWorkId } });
  }
}
