import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiBasicAuth,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { UsersService } from './users.service';

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
}
