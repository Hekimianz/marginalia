import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly cloud_name: string;
  private readonly api_key: string;
  private readonly api_secret: string;
  constructor(private readonly configService: ConfigService) {
    this.cloud_name = configService.get<string>('CLOUDINARY_CLOUD_NAME')!;
    this.api_key = configService.get<string>('CLOUDINARY_API_KEY')!;
    this.api_secret = configService.get<string>('CLOUDINARY_API_SECRET')!;
    cloudinary.config({
      cloud_name: this.cloud_name,
      api_key: this.api_key,
      api_secret: this.api_secret,
    });
  }

  generateAvatarUploadSignature(userId: string) {
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = `avatars/${userId}`;
    const hash = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      this.api_secret,
    );
    return {
      signature: hash,
      timestamp,
      folder,
      apiKey: this.api_key,
      cloudName: this.cloud_name,
    };
  }
}
