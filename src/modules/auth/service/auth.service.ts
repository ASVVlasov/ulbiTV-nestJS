import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { AuthModel } from '../model/auth.model';
import { CreateAuthDto } from '../dto/auth-request.dto';
import { UserModel } from '../../users/model/users.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel) private authRepository: typeof AuthModel,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const auth = await this.authRepository.findOne({ where: { email }, include: { all: true } });
    if (!auth) {
      throw new NotFoundException('Пользователь с таким email не найден');
    }
    const isPasswordEquals = await bcrypt.compare(password, auth.password);
    if (isPasswordEquals) {
      return auth.user;
    }
    throw new UnauthorizedException();
  }

  async signin(authRequest: CreateAuthDto) {
    const validatedUser = await this.validateUser(authRequest.email, authRequest.password);
    if (validatedUser) {
      return this.sign(validatedUser);
    }
    throw new UnauthorizedException();
  }

  async signup(authRequest: CreateAuthDto) {
    const foundAuth = await this.authRepository.findOne({ where: { email: authRequest.email } });
    if (foundAuth) {
      throw new BadRequestException('Пользователь с таким Email уже существует');
    }
    const hashPassword = await bcrypt.hash(authRequest.password, 10);
    const auth = await this.authRepository.create({ ...authRequest, password: hashPassword });
    const user = await this.usersService.createUser({ id: auth.id, email: authRequest.email });
    await auth.$set('user', user);
    return this.sign(user);
  }

  private sign(user: UserModel) {
    const payload = { user: user.toJSON() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
