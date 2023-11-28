/* eslint-disable simple-import-sort/imports */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import UserModule from '@/user/user.module';

import AuthController from './auth.controller';
import AuthService from './auth.service';
import JwtRefreshStrategy from './strategy/jwt-refresh.strategy';
import JwtStrategy from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
})
class AuthModule {}

export default AuthModule;
