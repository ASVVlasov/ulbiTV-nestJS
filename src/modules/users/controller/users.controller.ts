import { Body, Controller, Get, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from '../model/users.model';
import { AddRoleDto } from '../dto/add-role.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-guard.decorator';
import { CreateUserDto } from '../dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Пользователи')
@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Get('/')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Добавление роли пользователю' })
  @ApiResponse({ status: 200, type: AddRoleDto })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: 'Получение текущего пользователя' })
  @ApiResponse({ status: 200, type: UserModel })
  @Get('/current')
  public getCurrentUser(@Req() req) {
    return this.usersService.getCurrentUser(req.user);
  }

  @ApiOperation({ summary: 'Изменение информации текущего пользователя' })
  @ApiResponse({ status: 200, type: UserModel })
  @UseInterceptors(FileInterceptor('avatar'))
  @Put('/current')
  public updateUser(@UploadedFile() avatar: Express.Multer.File, @Body() userDto: CreateUserDto) {
    return this.usersService.updateUser(userDto, avatar);
  }

  @ApiOperation({ summary: 'Изменение аватара текущего пользователя' })
  @ApiResponse({ status: 200, type: UserModel })
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('/current')
  public uploadAvatar(@UploadedFile() avatar: Express.Multer.File, @Req() req) {
    return this.usersService.uploadAvatar(req.user.id, avatar);
  }
}
