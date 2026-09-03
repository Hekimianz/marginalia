import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenRepository } from '../refresh-token/refreshToken.repository';
import { createHash, randomBytes } from 'crypto';
import { LoginUserDto } from './dtos/login-user.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly refreshTokenRepo: RefreshTokenRepository,
  ) {}

  DUMMY_HASH = '$2b$10$GgaoIINZLLlhmOI2N5gsNO07UUUj0qv0KRqIpFGABBcKA5353HtIu';

  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    const passwordValid = await bcrypt.compare(
      loginUserDto.password,
      user ? user.password : this.DUMMY_HASH,
    );

    if (!user || !passwordValid)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(
    user: User,
  ): Promise<{ access_token: string; refresh_token: string }> {
    if (user.isDeleted) {
      console.log('DELETED USER');
      throw new NotFoundException('Invalid credentials');
    }
    const payload = { sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.createRefreshToken(user);
    return { access_token, refresh_token };
  }

  async createRefreshToken(user: User): Promise<string> {
    const expiresAt = new Date(
      Date.now() + this.configService.get<number>('REFRESH_EXPIRES_MS')!,
    );
    const rawToken = randomBytes(64).toString('hex');
    const tokenHash = createHash('sha256').update(rawToken).digest('hex');

    await this.refreshTokenRepo.create(tokenHash, user, expiresAt);
    return rawToken;
  }

  async refresh(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const hashedToken = createHash('sha256')
      .update(refreshTokenDto.refresh_token)
      .digest('hex');
    const foundToken = await this.refreshTokenRepo.findByHash(hashedToken);
    if (foundToken?.user.isDeleted)
      throw new UnauthorizedException('User not found');
    if (!foundToken) throw new UnauthorizedException('Invalid token');
    if (foundToken.expiresAt < new Date()) {
      await this.refreshTokenRepo.delete(foundToken);
      throw new UnauthorizedException('Invalid token');
    }
    await this.refreshTokenRepo.delete(foundToken);
    const payload = { sub: foundToken.user.id };
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.createRefreshToken(foundToken.user);
    return { access_token, refresh_token };
  }

  async logout(user: User, refreshTokenDto: RefreshTokenDto): Promise<void> {
    const hashedToken = createHash('sha256')
      .update(refreshTokenDto.refresh_token)
      .digest('hex');
    const token = await this.refreshTokenRepo.findByHash(hashedToken);
    if (!token) return;
    if (token.user.id !== user.id)
      throw new UnauthorizedException(
        'You are not authorized to do this action',
      );
    await this.refreshTokenRepo.delete(token);
  }
}
