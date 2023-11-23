import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import AuthService from '@/auth/auth.service';
import UserService from '@/user/user.service';

const mockUserService = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  comparePassword: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user and generate a token', async () => {
      const createUserDto = {} as any;
      const user = {} as any;
      const auth = { token: 'mockToken', user };

      mockUserService.create.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue('mockToken');

      const result = await authService.register(createUserDto);

      expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
      expect(mockJwtService.sign).toHaveBeenCalledWith({ id: user.id, role: user.role });
      expect(result).toEqual(auth);
    });

    it('should handle errors during user registration', async () => {
      const createUserDto = {} as any;

      mockUserService.create.mockRejectedValue(new Error('Some unexpected error'));

      await expect(authService.register(createUserDto)).rejects.toThrow();
      expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('login', () => {
    it('should login a user and generate a token', async () => {
      const loginDto = {} as any;
      const user = { id: 'userId', role: 'USER', password: 'hashedPassword' } as any;
      const auth = { token: 'mockToken', user };

      mockUserService.findByEmail.mockResolvedValue(user);
      mockUserService.comparePassword.mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('mockToken');

      const result = await authService.login(loginDto);

      expect(mockUserService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(mockUserService.comparePassword).toHaveBeenCalledWith(loginDto.password, user.password);
      expect(mockJwtService.sign).toHaveBeenCalledWith({ id: user.id, role: user.role });
      expect(result).toEqual(auth);
    });

    it('should handle invalid credentials during login', async () => {
      const loginDto = {} as any;

      mockUserService.findByEmail.mockResolvedValue(null);

      await expect(authService.login(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(mockUserService.findByEmail).toHaveBeenCalledWith(loginDto.email);
    });

    it('should handle invalid password during login', async () => {
      const loginDto = {} as any;
      const user = { id: 'userId', role: 'USER', password: 'hashedPassword' } as any;

      mockUserService.findByEmail.mockResolvedValue(user);
      mockUserService.comparePassword.mockResolvedValue(false);

      await expect(authService.login(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(mockUserService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(mockUserService.comparePassword).toHaveBeenCalledWith(loginDto.password, user.password);
    });

    it('should handle errors during user login', async () => {
      const loginDto = {} as any;

      mockUserService.findByEmail.mockRejectedValue(new Error('Some unexpected error'));

      await expect(authService.login(loginDto)).rejects.toThrow();
      expect(mockUserService.findByEmail).toHaveBeenCalledWith(loginDto.email);
    });
  });
});
