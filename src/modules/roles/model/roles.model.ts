import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../../users/model/users.model';
import { UserRolesModel } from '../../../models/user-roles.model';
interface IRoleModel {
  value: string;
  description: string;
}
@Table({ tableName: 'roles' })
export class RoleModel extends Model<RoleModel, IRoleModel> {
  @ApiProperty({ example: '8423b39f-6add-426d-89e9-32f806d797d3', description: 'UUID пользователя' })
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @ApiProperty({ example: 'ADMIN', description: 'Значение роли пользователя' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => UserModel, () => UserRolesModel)
  users: UserModel[];
}
