import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import CreateUserDto from '@/user/dto/create-user.dto';

import AuthService from './auth.service';
import LoginDto from './dto/login.dto';
import RefreshTokenDto from './dto/refresh-token.dto';
import Auth from './entities/auth.entity';
import JwtRefreshAuthGuard from './guard/jwt-refresh.guard';

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

  @Post('refresh-token')
  @UseGuards(JwtRefreshAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh Token' })
  @ApiCreatedResponse({ type: Auth })
  async refreshToken(@Body() refreshToken: RefreshTokenDto): Promise<Auth> {
    const token = await this.authService.refreshToken(refreshToken.refreshToken);
    return token;
  }
}

export default AuthController;
