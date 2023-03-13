import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../model/users.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { RolesService } from '../../roles/service/roles.service';
import { AddRoleDto } from '../dto/add-role.dto';
import { EFileType, FileService } from '../../file/file.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel,
    private rolesService: RolesService,
    private fileService: FileService,
  ) {}

  async createUser(userDto: CreateUserDto) {
    return await this.userRepository.create(userDto);
  }

  async updateUser(userDto: CreateUserDto, avatar: Express.Multer.File) {
    const user = await this.userRepository.findByPk(userDto.id);
    const avatarPath = this.fileService.createFile(EFileType.IMAGE, avatar);
    if (user.avatar) {
      this.fileService.removeFile(user.avatar);
    }
    await user.update({ ...userDto, avatar: avatarPath });
    await user.save();
    return user;
  }

  async uploadAvatar(userId: string, avatar: Express.Multer.File) {
    const avatarPath = this.fileService.createFile(EFileType.IMAGE, avatar);
    const user = await this.userRepository.findByPk(userId);
    if (user.avatar) {
      this.fileService.removeFile(user.avatar);
    }
    await user.update({ avatar: avatarPath });
    await user.save();
    return user;
  }

  async getCurrentUser(user: UserModel) {
    return await this.userRepository.findByPk(user.id);
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId);
    const role = await this.rolesService.getRoleByValue(addRoleDto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return addRoleDto;
    }
    throw new NotFoundException('Пользователь или роль не найдены');
  }

  async getUserById(id: string) {
    return this.userRepository.findByPk(id);
  }
}
