import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import UserModule from '@/user/user.module';
import { JWT_EXPIRES_IN, JWT_SECRET } from '@/utils/constants';

import AuthController from './auth.controller';
import AuthService from './auth.service';
import JwtStrategy from './strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
class AuthModule {}

export default AuthModule;
