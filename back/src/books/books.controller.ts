import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BookSearchResult, BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { Book } from './entities/book.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SearchBookDto } from './dtos/search-book.dto';
import { ImportOpenLibraryBookDto } from './dtos/import-open-library-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.booksService.fetchAll();
  }

  @Get('/search')
  async searchBook(
    @Query() searchBookDto: SearchBookDto,
  ): Promise<BookSearchResult[]> {
    return await this.booksService.searchBooks(searchBookDto.q);
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Book> {
    return await this.booksService.validateBookById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.booksService.create(createBookDto);
  }

  @Post('/import')
  @UseGuards(JwtAuthGuard)
  async importBook(
    @Body() importOpenLibraryBookDto: ImportOpenLibraryBookDto,
  ): Promise<Book> {
    return await this.booksService.findOrCreateOpenLibraryBook(
      importOpenLibraryBookDto,
    );
  }
}
