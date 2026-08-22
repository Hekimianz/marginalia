import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReadingSessionService } from './reading-session.service';
import { CreateSessionDto } from './dtos/create-session.dto';
import { ReadingSession } from './entities/reading-session.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { UpdateReadingSessionDto } from './dtos/update-session.dto';

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

  @Get('/:id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ReadingSession> {
    return await this.readingSessionsService.validateSessionById(id);
  }

  @Post('update/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateReadingSessionDto: UpdateReadingSessionDto,
    @CurrentUser() user: User,
  ): Promise<ReadingSession> {
    return await this.readingSessionsService.update(
      id,
      updateReadingSessionDto,
      user,
    );
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteSession(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.readingSessionsService.deleteById(id, user);
  }
}
