import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({ description: '用户名' })
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty({ description: '密码' })
  readonly password: string;
}
