import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../../users/model/users.model';

@Table({ tableName: 'auth' })
export class AuthModel extends Model<AuthModel> {
  @ApiProperty({ example: '8423b39f-6add-426d-89e9-32f806d797d3', description: 'UUID пользователя' })
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @ApiProperty({ example: 'admin@gmail.com', description: 'Email пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @ApiProperty({ example: 'password', description: 'пароль пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: {}, description: 'Информация о пользователе' })
  @HasOne(() => UserModel)
  user: UserModel;
}
