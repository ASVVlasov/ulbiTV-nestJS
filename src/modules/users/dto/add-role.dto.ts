import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { ERoleName } from '../../roles/roles.interface';

export class AddRoleDto {
  @ApiProperty({ example: '8423b39f-6add-426d-89e9-32f806d797d3', description: 'uuid пользователя' })
  @IsUUID()
  readonly userId: string;
  @ApiProperty({ example: 'ADMIN', description: 'название роли' })
  @IsEnum(ERoleName)
  readonly value: string;
}
