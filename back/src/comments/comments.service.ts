import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { PostsService } from 'src/posts/posts.service';
import { CommentResponseDto } from './dtos/comment-response.dto';
import { toCommentResponse } from './comment-mapper';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    private readonly repo: CommentsRepository,
    private readonly postsService: PostsService,
  ) {}

  async fetchComments(postId: string): Promise<CommentResponseDto[]> {
    await this.postsService.validateById(postId);
    const comments = await this.repo.fetchComments(postId);
    return comments.map(toCommentResponse);
  }

  async createComment(
    postId: string,
    dto: CreateCommentDto,
    user: User,
  ): Promise<CommentResponseDto> {
    await this.postsService.validateById(postId);
    const newComment = await this.repo.createComment(postId, dto, user);
    return toCommentResponse(newComment);
  }
}
