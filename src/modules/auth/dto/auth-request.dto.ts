import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'admin@gmail.com', description: 'email пользователя' })
  @IsEmail()
  readonly email: string;
  @ApiProperty({ example: '123456789', description: 'пароль пользователя' })
  @IsString()
  @Length(6, 12)
  readonly password: string;
}
