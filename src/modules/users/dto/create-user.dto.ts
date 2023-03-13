import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: '8423b39f-6add-426d-89e9-32f806d797d3', description: 'email пользователя' })
  @IsString()
  @IsUUID()
  readonly id: string;
  @ApiProperty({ example: 'email@mail.ru', description: 'email пользователя' })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  readonly firstName?: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  readonly lastName?: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество пользователя' })
  readonly secondName?: string;

  @ApiProperty({ example: 'Россия', description: 'Страна пользователя' })
  readonly country?: string;

  @ApiProperty({ example: 'Москва', description: 'Город пользователя' })
  readonly city?: string;

  @ApiProperty({ example: 'RUB', description: 'Валюта пользователя' })
  readonly currency?: string;

  @ApiProperty({ example: '18', description: 'Возраст пользователя' })
  readonly age?: number;

  @ApiProperty({ example: 'example.json', description: 'Ававтар пользователя' })
  readonly avatar?: string;
}
