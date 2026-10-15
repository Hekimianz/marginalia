import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { PostModule } from 'src/posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), PostModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentModule {}
