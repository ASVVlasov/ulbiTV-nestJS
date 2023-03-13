import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UserModel } from '../modules/users/model/users.model';
import { RoleModel } from '../modules/roles/model/roles.model';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRolesModel extends Model<UserRolesModel> {
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: typeof DataType.UUID;

  @ForeignKey(() => RoleModel)
  @Column({ type: DataType.UUID, allowNull: false })
  roleId: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;
}
