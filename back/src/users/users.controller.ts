import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { ChangeAvatarDto } from './dtos/change-avatar.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('/avatar')
  @UseGuards(JwtAuthGuard)
  async changeAvatar(
    @Body() changeAvatarDto: ChangeAvatarDto,
    @CurrentUser() user: User,
  ): Promise<User> {
    return await this.usersService.changeAvatar(user.id, changeAvatarDto.url);
  }

  @Get('/avatar/signature')
  @UseGuards(JwtAuthGuard)
  getAvatarSignature(@CurrentUser() user: User) {
    return this.usersService.getAvatarSignature(user.id);
  }

  @Patch('/delete')
  @UseGuards(JwtAuthGuard)
  async deleteAccount(@CurrentUser() user: User) {
    return await this.usersService.deleteAccount(user);
  }
}
