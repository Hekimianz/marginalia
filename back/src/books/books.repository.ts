import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(Book) private readonly repo: Repository<Book>,
  ) {}

  async create(title: string, author: string): Promise<Book> {
    return await this.repo.save(this.repo.create({ title, author }));
  }

  async fetchAll(): Promise<Book[]> {
    return await this.repo.find();
  }

  async fetchByIdOrNull(id: string): Promise<Book | null> {
    return await this.repo.findOne({ where: { id } });
  }
}
