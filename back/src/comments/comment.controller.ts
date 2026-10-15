import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentResponseDto } from './dtos/comment-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async fetchComments(
    @Param('postId', new ParseUUIDPipe()) postId: string,
  ): Promise<CommentResponseDto[]> {
    return await this.commentsService.fetchComments(postId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Param('postId', new ParseUUIDPipe()) postId: string,
    @Body() dto: CreateCommentDto,
    @CurrentUser() user: User,
  ): Promise<CommentResponseDto> {
    return await this.commentsService.createComment(postId, dto, user);
  }
}
