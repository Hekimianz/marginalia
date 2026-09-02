import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dtos/create-book.dto';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(Book) private readonly repo: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return await this.repo.save(this.repo.create(createBookDto));
  }

  async fetchAll(): Promise<Book[]> {
    return await this.repo.find();
  }

  async fetchByIdOrNull(id: string): Promise<Book | null> {
    return await this.repo.findOne({ where: { id } });
  }
}
