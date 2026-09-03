import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { QueryFailedError } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { RefreshTokenRepository } from 'src/refresh-token/refreshToken.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly refreshTokenRepo: RefreshTokenRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (userExists) throw new ConflictException('Email already in use');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    try {
      return await this.usersRepository.create(
        createUserDto.firstName,
        createUserDto.lastName,
        createUserDto.username,
        createUserDto.email,
        hashedPassword,
      );
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as unknown as { code?: string }).code === '23505'
      ) {
        throw new ConflictException('Email is already in use');
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return await this.usersRepository.findById(id);
  }

  async changeAvatar(id: string, url: string): Promise<User> {
    await this.validateUserById(id);
    return await this.usersRepository.changeAvatar(id, url);
  }

  getAvatarSignature(userId: string) {
    return this.cloudinaryService.generateAvatarUploadSignature(userId);
  }

  async validateUserById(id: string): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('No user found with given id');
    return user;
  }

  async deleteAccount(user: User) {
    if (user.isDeleted) return;
    await this.usersRepository.deleteAccount(user);
    await this.refreshTokenRepo.deleteAllForUser(user.id);
  }
}
