import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ReadingSessionStatus } from '../entities/reading-session.entity';

export class UpdateReadingSessionDto {
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

  @IsEnum(ReadingSessionStatus)
  @IsOptional()
  status?: ReadingSessionStatus;
}
