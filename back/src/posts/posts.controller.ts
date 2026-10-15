import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Post as PostType } from './entities/post.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dtos/create-post.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { PostsService } from './posts.service';

@Controller('reading-session/:sessionId/posts')
export class PostController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async fetchPosts(
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
  ): Promise<PostType[]> {
    return await this.postsService.fetchPosts(sessionId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Body() dto: CreatePostDto,
    @CurrentUser() user: User,
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
  ): Promise<PostType> {
    return await this.postsService.createPost(dto, user, sessionId);
  }
}
