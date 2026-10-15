import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from 'src/users/entities/user.entity';
import { Post } from './entities/post.entity';
import { ReadingSessionService } from 'src/reading-session/reading-session.service';

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
  ): Promise<Post> {
    const session =
      await this.readingSessionService.validateSessionById(sessionId);
    if (session.user.id !== user.id) {
      throw new UnauthorizedException(
        'You are not authorized to do this action',
      );
    }
    return this.repo.createPost(dto, user, session);
  }

  async fetchPosts(sessionId: string): Promise<Post[]> {
    const session =
      await this.readingSessionService.validateSessionById(sessionId);
    return await this.repo.fetchPosts(session);
  }
}
