import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

export class ImportOpenLibraryBookDto {
  @IsString()
  @Matches(/^\/works\/.+/)
  openLibraryWorkId!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  author!: string;

  @IsUrl()
  @IsOptional()
  cover?: string | null;
}
