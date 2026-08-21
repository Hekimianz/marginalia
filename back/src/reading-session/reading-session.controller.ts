import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ReadingSessionService } from './reading-session.service';
import { CreateSessionDto } from './dtos/create-session.dto';
import { ReadingSession } from './entities/reading-session.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('reading-session')
export class ReadingSessionController {
  constructor(private readonly readingSessionsService: ReadingSessionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSession(
    @Body() createSessionDto: CreateSessionDto,
    @CurrentUser() user: User,
  ): Promise<ReadingSession> {
    return await this.readingSessionsService.createSession(
      createSessionDto,
      user,
    );
  }

  @Get()
  async fetchAll(): Promise<ReadingSession[]> {
    return await this.readingSessionsService.fetchAll();
  }
}
