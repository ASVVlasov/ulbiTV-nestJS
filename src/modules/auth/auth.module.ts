import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { AuthStrategy } from './auth.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModel } from './model/auth.model';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.SECRET || 'secret',
      signOptions: {
        expiresIn: '8h',
      },
    }),
    SequelizeModule.forFeature([AuthModel]),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
