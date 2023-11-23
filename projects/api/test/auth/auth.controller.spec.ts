import { Test, TestingModule } from '@nestjs/testing';

import AuthController from '@/auth/auth.controller';
import AuthService from '@/auth/auth.service';
import LoginDto from '@/auth/dto/login.dto';
import Auth from '@/auth/entities/auth.entity';
import CreateUserDto from '@/user/dto/create-user.dto';

jest.mock('@/auth/auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should successfully login and return token', async () => {
      const loginDto: LoginDto = {} as any;
      const authResponse: Auth = {} as any;

      jest.spyOn(authService, 'login').mockResolvedValue(authResponse);

      const result = await authController.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(authResponse);
    });

    it('should handle login errors', async () => {
      const loginDto: LoginDto = {} as any;

      jest.spyOn(authService, 'login').mockRejectedValue(new Error('Some unexpected error'));

      await expect(authController.login(loginDto)).rejects.toThrow();
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('register', () => {
    it('should successfully register and return token', async () => {
      const createUserDto: CreateUserDto = {} as any;
      const authResponse: Auth = {} as any;

      jest.spyOn(authService, 'register').mockResolvedValue(authResponse);

      const result = await authController.register(createUserDto);

      expect(authService.register).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(authResponse);
    });

    it('should handle registration errors', async () => {
      const createUserDto: CreateUserDto = {} as any;

      jest.spyOn(authService, 'register').mockRejectedValue(new Error('Some unexpected error'));

      await expect(authController.register(createUserDto)).rejects.toThrow();
      expect(authService.register).toHaveBeenCalledWith(createUserDto);
    });
  });
});
