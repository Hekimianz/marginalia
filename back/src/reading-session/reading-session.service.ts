import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateSessionDto } from './dtos/create-session.dto';
import { ReadingSession } from './entities/reading-session.entity';
import { ReadingSessionRepository } from './reading-session.repository';
import { BooksService } from 'src/books/books.service';
import { User } from 'src/users/entities/user.entity';
import { UpdateReadingSessionDto } from './dtos/update-session.dto';

@Injectable()
export class ReadingSessionService {
  constructor(
    private readonly readingSessionsRepository: ReadingSessionRepository,
    private readonly booksService: BooksService,
  ) {}

  async createSession(
    createSessionDto: CreateSessionDto,
    user: User,
  ): Promise<ReadingSession> {
    const book = await this.booksService.validateBookById(
      createSessionDto.bookId,
    );
    return await this.readingSessionsRepository.create(
      createSessionDto,
      user,
      book,
    );
  }

  async validateSessionById(id: string): Promise<ReadingSession> {
    const session = await this.readingSessionsRepository.findById(id);
    if (!session)
      throw new NotFoundException('No reading session found with given id');
    return session;
  }

  async fetchAll(): Promise<ReadingSession[]> {
    return await this.readingSessionsRepository.findAll();
  }

  async update(
    id: string,
    updateReadingSessionDto: UpdateReadingSessionDto,
    user: User,
  ): Promise<ReadingSession> {
    const session = await this.validateSessionById(id);
    if (session.user.id !== user.id)
      throw new UnauthorizedException(
        'You are not authorized to do this action',
      );
    return await this.readingSessionsRepository.updateById(
      session.id,
      updateReadingSessionDto,
    );
  }

  async deleteById(id: string, user: User): Promise<void> {
    const session = await this.validateSessionById(id);
    if (session.user.id !== user.id)
      throw new UnauthorizedException(
        'You are not authorized to do this action',
      );
    await this.readingSessionsRepository.delete(session);
  }
}
