import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotBlank } from '../../../core/decorators/custom-validator.decorator';

export class LoginDto {
  @ApiProperty({ description: '用户名' })
  @IsNotBlank()
  readonly username: string;

  @ApiProperty({ description: '密码' })
  @IsNotBlank()
  readonly password: string;
}
