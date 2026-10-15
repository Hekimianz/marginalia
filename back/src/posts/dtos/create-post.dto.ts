import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PostType } from '../entities/post.entity';
import { Transform } from 'class-transformer';

export class CreatePostDto {
  @IsEnum(PostType)
  type!: PostType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20_000)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  content!: string;

  @IsString()
  @IsOptional()
  chapterSection?: string;
}
