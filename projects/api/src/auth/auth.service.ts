import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import CreateUserDto from '@/user/dto/create-user.dto';
import User from '@/user/entities/user.entity';
import UserService from '@/user/user.service';

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
    return this.generateToken(user);
  }

  async login(loginDto: LoginDto): Promise<Auth> {
    const user = await this.validateUser(loginDto);
    return this.generateToken(user);
  }

  private async validateUser(loginDto: LoginDto): Promise<User> {
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

  private generateToken(user: User): Auth {
    const payload = {
      id: user.id,
      role: user.role,
    };

    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }
}

export default AuthService;
