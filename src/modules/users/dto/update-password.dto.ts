import { IsNotBlank } from '../../../core/decorators/custom-validator.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ description: '密码' })
  @IsNotBlank()
  readonly password: string;
}
