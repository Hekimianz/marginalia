import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    return await this.authService.login(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: User): User {
    return user;
  }

  @Post('refresh')
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<{ refresh_token: string }> {
    return await this.authService.refresh(refreshTokenDto.refresh_token);
  }
}
