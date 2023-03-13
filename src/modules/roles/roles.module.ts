import { Module } from '@nestjs/common';
import { RolesController } from './controller/roles.controller';
import { RolesService } from './service/roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModel } from './model/roles.model';
import { UserModel } from '../users/model/users.model';
import { UserRolesModel } from '../../models/user-roles.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([RoleModel, UserModel, UserRolesModel])],
  exports: [RolesService],
})
export class RolesModule {}
