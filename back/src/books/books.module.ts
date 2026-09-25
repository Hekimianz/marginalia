import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { OpenLibraryService } from './open-library.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BooksService, BooksRepository, OpenLibraryService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
