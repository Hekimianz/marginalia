import { toCommentResponse } from 'src/comments/comment-mapper';
import { PostResponseDto } from './dtos/post-response.dto';
import { Post } from './entities/post.entity';

export function toPostResponse(post: Post): PostResponseDto {
  return {
    id: post.id,
    type: post.type,
    content: post.content,
    chapterSection: post.chapterSection ?? null,
    createdAt: post.createdAt,
    author: {
      username: post.author.username,
    },
    comments: (post.comments ?? []).map(toCommentResponse),
  };
}
