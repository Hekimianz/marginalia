export class CommentResponseDto {
  id!: string;
  content!: string;
  createdAt!: Date;
  author!: { username: string };
}
