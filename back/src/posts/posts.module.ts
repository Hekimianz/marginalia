import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './posts.controller';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { ReadingSessionModule } from 'src/reading-session/reading-session.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), ReadingSessionModule],
  controllers: [PostController],
  providers: [PostsService, PostsRepository],
})
export class PostModule {}
