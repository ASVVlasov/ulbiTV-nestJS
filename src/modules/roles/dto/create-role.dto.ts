import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { ERoleName } from '../roles.interface';

export class CreateRoleDto {
  @ApiProperty({ example: 'USER', description: 'название роли' })
  @IsEnum(ERoleName)
  readonly value: string;
  @ApiProperty({ example: 'пользователь', description: 'описание роли' })
  @IsString()
  readonly description: string;
}
