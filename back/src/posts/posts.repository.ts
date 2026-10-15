import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from 'src/users/entities/user.entity';
import { ReadingSession } from 'src/reading-session/entities/reading-session.entity';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post) private readonly repo: Repository<Post>,
  ) {}

  async createPost(
    dto: CreatePostDto,
    user: User,
    session: ReadingSession,
  ): Promise<Post> {
    const newPost = this.repo.create({
      ...dto,
      author: user,
      readingSession: session,
    });

    return await this.repo.save(newPost);
  }

  async fetchPosts(session: ReadingSession): Promise<Post[]> {
    return await this.repo.find({
      where: { readingSession: session },
      relations: { author: true, comments: { author: true } },
      order: { createdAt: 'ASC' },
    });
  }

  async fetchPostById(postId: string): Promise<Post | null> {
    return await this.repo.findOne({
      where: { id: postId },
    });
  }
}
