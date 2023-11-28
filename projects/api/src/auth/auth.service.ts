import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import CreateUserDto from '@/user/dto/create-user.dto';
import User from '@/user/entities/user.entity';
import UserService from '@/user/user.service';
import { JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_SECRET } from '@/utils/constants';

import LoginDto from './dto/login.dto';
import Auth from './entities/auth.entity';

@Injectable()
class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<Auth> {
    const user = await this.userService.create(createUserDto);
    const token = await this.generateToken(user);
    return token;
  }

  async login(loginDto: LoginDto): Promise<Auth> {
    const user = await this.validateUser(loginDto);
    const token = await this.generateToken(user);
    return token;
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordValid = await this.userService.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return user;
  }

  async validateUserWithId(id: string): Promise<User> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return user;
  }

  async generateToken(user: User, refreshToken?: string): Promise<Auth> {
    const payload = {
      id: user.id,
      role: user.role,
    };

    return {
      token: await this.jwtService.signAsync(payload, { secret: JWT_SECRET, expiresIn: JWT_EXPIRES_IN }),
      refreshToken:
        refreshToken ||
        (await this.jwtService.signAsync(payload, { secret: JWT_REFRESH_SECRET, expiresIn: JWT_REFRESH_EXPIRES_IN })),
      user,
    };
  }

  async refreshToken(refreshToken: string): Promise<Auth> {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: JWT_REFRESH_SECRET,
    });

    const user = await this.validateUserWithId(payload.id);
    const token = await this.generateToken(user, refreshToken);

    return token;
  }
}

export default AuthService;
