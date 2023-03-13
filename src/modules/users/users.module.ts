import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './model/users.model';
import { RoleModel } from '../roles/model/roles.model';
import { UserRolesModel } from '../../models/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../file/file.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([UserModel, RoleModel, UserRolesModel]),
    RolesModule,
    FileModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
