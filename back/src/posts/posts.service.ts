import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from 'src/users/entities/user.entity';
import { ReadingSessionService } from 'src/reading-session/reading-session.service';
import { toPostResponse } from './post-response.mapper';
import { PostResponseDto } from './dtos/post-response.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly repo: PostsRepository,
    private readonly readingSessionService: ReadingSessionService,
  ) {}

  async createPost(
    dto: CreatePostDto,
    user: User,
    sessionId: string,
  ): Promise<PostResponseDto> {
    const session =
      await this.readingSessionService.validateSessionById(sessionId);
    if (session.user.id !== user.id) {
      throw new UnauthorizedException(
        'You are not authorized to do this action',
      );
    }
    const post = await this.repo.createPost(dto, user, session);
    return toPostResponse(post);
  }

  async fetchPosts(sessionId: string): Promise<PostResponseDto[]> {
    const session =
      await this.readingSessionService.validateSessionById(sessionId);
    const posts = await this.repo.fetchPosts(session);
    return posts.map(toPostResponse);
  }

  async validateById(postId: string): Promise<void> {
    const post = await this.repo.fetchPostById(postId);
    if (!post) throw new NotFoundException('No post found');
  }
}
