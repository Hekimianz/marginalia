import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(Comment) private readonly repo: Repository<Comment>,
  ) {}

  async fetchComments(postId: string): Promise<Comment[]> {
    return await this.repo.find({
      where: { post: { id: postId } },
      relations: { author: true },
    });
  }

  async createComment(
    postId: string,
    dto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const newComment = this.repo.create({
      ...dto,
      post: { id: postId },
      author: user,
    });

    return await this.repo.save(newComment);
  }
}
