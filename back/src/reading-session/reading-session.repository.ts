import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadingSession } from './entities/reading-session.entity';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dtos/create-session.dto';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import { UpdateReadingSessionDto } from './dtos/update-session.dto';

@Injectable()
export class ReadingSessionRepository {
  constructor(
    @InjectRepository(ReadingSession)
    private readonly repo: Repository<ReadingSession>,
  ) {}

  async create(
    createSessionDto: CreateSessionDto,
    user: User,
    book: Book,
  ): Promise<ReadingSession> {
    const session = this.repo.create(createSessionDto);
    session.user = user;
    session.book = book;
    const sessionSaved = await this.repo.save(session);
    return (await this.findById(sessionSaved.id))!;
  }

  async findById(id: string): Promise<ReadingSession | null> {
    return await this.repo.findOne({ where: { id }, relations: ['user'] });
  }

  async findAll(): Promise<ReadingSession[]> {
    return await this.repo.find({ relations: ['user'] });
  }

  async updateById(
    sessionId: string,
    updateReadingSession: UpdateReadingSessionDto,
  ): Promise<ReadingSession> {
    const session = await this.repo.preload({
      id: sessionId,
      ...updateReadingSession,
    });
    return await this.repo.save(session!);
  }

  async delete(session: ReadingSession): Promise<void> {
    await this.repo.remove(session);
  }
}
