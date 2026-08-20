import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(email: string, password: string): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);
    if (userExists) throw new ConflictException('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      return await this.usersRepository.create(email, hashedPassword);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).code === '23505'
      ) {
        throw new ConflictException('Email is already in use');
      }
      throw error;
    }
  }
}
