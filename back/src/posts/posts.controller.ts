import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dtos/create-post.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { PostsService } from './posts.service';
import { PostResponseDto } from './dtos/post-response.dto';

@Controller('reading-session/:sessionId/posts')
export class PostController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async fetchPosts(
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
  ): Promise<PostResponseDto[]> {
    return await this.postsService.fetchPosts(sessionId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Body() dto: CreatePostDto,
    @CurrentUser() user: User,
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
  ): Promise<PostResponseDto> {
    return await this.postsService.createPost(dto, user, sessionId);
  }
}
