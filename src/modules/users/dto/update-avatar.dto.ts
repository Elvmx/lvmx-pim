import { IsNotBlank } from '../../../core/decorators/custom-validator.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAvatarDto {
  @ApiProperty({ description: '头像地址' })
  @IsNotBlank()
  readonly avatar: string;
}
