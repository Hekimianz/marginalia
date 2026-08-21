import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  author!: string;
}
