import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from '../service/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoleModel } from '../model/roles.model';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: RoleModel })
  @Post()
  createRole(@Body() dto: CreateRoleDto): Promise<RoleModel> {
    return this.rolesService.createRole(dto);
  }

  @ApiOperation({ summary: 'Поиск роли по value' })
  @ApiResponse({ status: 200, type: RoleModel })
  @Get('/:value')
  getRolesByValue(@Param('value') value: string): Promise<RoleModel> {
    return this.rolesService.getRoleByValue(value);
  }

  @ApiOperation({ summary: 'Список всех ролей' })
  @ApiResponse({ status: 200, type: [RoleModel] })
  @Get()
  getRoles(): Promise<RoleModel[]> {
    return this.rolesService.getRoles();
  }
}
