import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
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
    return await this.booksService.create(createBookDto);
  }

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.booksService.fetchAll();
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Book> {
    return await this.booksService.validateBookById(id);
  }
}
