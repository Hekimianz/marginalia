import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { Book } from './entities/book.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.booksService.create(
      createBookDto.title,
      createBookDto.author,
    );
  }

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.booksService.fetchAll();
  }
}
