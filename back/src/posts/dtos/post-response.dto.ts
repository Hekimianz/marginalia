import { Comment } from 'src/comments/entities/comment.entity';
import { PostType } from '../entities/post.entity';
import { CommentResponseDto } from 'src/comments/dtos/comment-response.dto';

export class PostResponseDto {
  id!: string;
  type!: PostType;
  content!: string;
  chapterSection!: string | null;
  createdAt!: Date;
  author!: { username: string };
  comments!: CommentResponseDto[];
}
