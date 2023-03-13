import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from '../model/roles.model';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(RoleModel) private roleRepository: typeof RoleModel) {}

  async createRole(dto: CreateRoleDto) {
    return this.roleRepository.create(dto);
  }

  async getRoleByValue(value: string) {
    return this.roleRepository.findOne({ where: { value } });
  }

  async getRoles() {
    return this.roleRepository.findAll();
  }
}
