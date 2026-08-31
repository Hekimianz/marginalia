import { IsUrl } from 'class-validator';

export class ChangeAvatarDto {
  @IsUrl()
  url!: string;
}
