import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateSessionDto {
  @IsOptional()
  @IsString()
  synthesis?: string;

  @IsOptional()
  @IsString()
  review?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.0)
  @Max(5.0)
  rating?: number;

  @IsNotEmpty()
  @IsUUID()
  bookId!: string;
}
