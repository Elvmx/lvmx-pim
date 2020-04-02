import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * 创建用户
   * @param data 用户信息
   */
  async create(data: CreateUserDto) {
    const { username } = data;
    const user = await this.findOne(username);

    if (user) {
      throw new BadRequestException('用户名已存在');
    }

    const entity = this.usersRepository.create(data);
    return this.usersRepository.save(entity);
  }

  /**
   * 根据 username 查找用户
   * @param username 用户名
   */
  async findOne(username: string) {
    return await this.usersRepository.findOne({ username });
  }
}
