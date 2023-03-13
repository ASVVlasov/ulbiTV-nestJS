import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { RoleModel } from '../../roles/model/roles.model';
import { UserRolesModel } from '../../../models/user-roles.model';
import { AuthModel } from '../../auth/model/auth.model';

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel> {
  @ForeignKey(() => AuthModel)
  @ApiProperty({ example: '8423b39f-6add-426d-89e9-32f806d797d3', description: 'UUID пользователя' })
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @ApiProperty({ example: 'admin@gmail.com', description: 'email пользователя' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  lastName: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество пользователя' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  secondName: string;

  @ApiProperty({ example: 'Россия', description: 'Страна пользователя' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  country: string;

  @ApiProperty({ example: 'Москва', description: 'Город пользователя' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  city: string;

  @ApiProperty({ example: 'RUB', description: 'Валюта пользователя' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  currency: string;

  @ApiProperty({ example: '18', description: 'Возраст пользователя' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 0 })
  age: number;

  @ApiProperty({ example: 'example.json', description: 'Ававтар пользователя' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  avatar: string;

  @ApiProperty({ example: [], description: 'Роли пользователя' })
  @BelongsToMany(() => RoleModel, () => UserRolesModel)
  roles: RoleModel[];
}
