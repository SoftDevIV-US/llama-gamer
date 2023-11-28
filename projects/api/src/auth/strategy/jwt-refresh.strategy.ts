import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import User from '@/user/entities/user.entity';
import UserService from '@/user/user.service';
import { JWT_REFRESH_SECRET } from '@/utils/constants';

@Injectable()
class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: { id: string }): Promise<User> {
    const user = await this.userService.findOne(payload.id);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return user;
  }
}

export default JwtRefreshStrategy;
