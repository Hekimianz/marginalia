import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.repo.findOne({
      where: { email },
      select: ['email', 'password', 'id'],
    });
  }

  async findById(id: string): Promise<User | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async create(email: string, password: string): Promise<User> {
    const user = this.repo.create({ email, password });
    return await this.repo.save(user);
  }
}
