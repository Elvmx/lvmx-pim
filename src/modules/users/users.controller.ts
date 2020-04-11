import {
  Controller,
  Get,
  UseGuards,
  Req,
  Body,
  Post,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';

@ApiTags('用户')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '获取用户基本信息' })
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req) {
    const { userId } = req.user;
    const { password, ...result } = await this.usersService.findById(userId);
    return result;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '修改密码' })
  @Post('password')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  async updatePasswod(@Req() req, @Body() data: UpdatePasswordDto) {
    const { userId } = req.user;
    const { password } = data;
    await this.usersService.updatePassword(userId, password);
    return;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '修改头像' })
  @Post('avatar')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  async updateAvatar(@Req() req, @Body() data: UpdateAvatarDto) {
    const { userId } = req.user;
    const { avatar } = data;
    await this.usersService.updateAvatar(userId, avatar);
    return;
  }
}
