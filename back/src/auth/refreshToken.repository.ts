import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repo: Repository<RefreshToken>,
  ) {}

  async create(token: string, user: User, expiresAt: Date) {
    return await this.repo.save(
      this.repo.create({ tokenHash: token, user, expiresAt }),
    );
  }

  async findByHash(tokenHash: string): Promise<RefreshToken | null> {
    return await this.repo.findOne({
      where: { tokenHash },
      relations: ['user'],
    });
  }

  async delete(token: RefreshToken): Promise<void> {
    await this.repo.remove(token);
  }
}
