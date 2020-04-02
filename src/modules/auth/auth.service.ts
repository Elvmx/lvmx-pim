import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 登录，未注册的会自动注册
   * @param data
   */
  async login(data: LoginDto) {
    let user = await this.usersService.findOne(data.username);
    if (!user) {
      user = await this.usersService.create(data);
    }

    if (!(await user.comparePassword(data.password))) {
      throw new UnauthorizedException('用户名或密码不正确');
    }

    const payload = { username: user.username, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
