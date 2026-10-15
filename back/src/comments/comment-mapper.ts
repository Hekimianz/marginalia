import { CommentResponseDto } from './dtos/comment-response.dto';
import { Comment } from './entities/comment.entity';

export function toCommentResponse(comment: Comment): CommentResponseDto {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    author: { username: comment.author.username },
  };
}
