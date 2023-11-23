import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import CreateUserDto from '@/user/dto/create-user.dto';

import AuthService from './auth.service';
import LoginDto from './dto/login.dto';
import Auth from './entities/auth.entity';

@ApiTags('Auth')
@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ type: Auth })
  async login(@Body() loginDto: LoginDto): Promise<Auth> {
    const token = await this.authService.login(loginDto);
    return token;
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiCreatedResponse({ type: Auth })
  async register(@Body() createUserDto: CreateUserDto): Promise<Auth> {
    const token = await this.authService.register(createUserDto);
    return token;
  }
}

export default AuthController;
