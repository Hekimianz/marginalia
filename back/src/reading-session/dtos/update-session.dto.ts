import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

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
}
