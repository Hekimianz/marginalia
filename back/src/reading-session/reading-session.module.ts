import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingSession } from './entities/reading-session.entity';
import { ReadingSessionController } from './reading-session.controller';
import { ReadingSessionService } from './reading-session.service';
import { ReadingSessionRepository } from './reading-session.repository';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReadingSession]), BooksModule],
  controllers: [ReadingSessionController],
  providers: [ReadingSessionService, ReadingSessionRepository],
})
export class ReadingSessionModule {}
