import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import PrismaService from '@/prisma/prisma.service';
import CreateUserDto from '@/user/dto/create-user.dto';
import UpdateUserDto from '@/user/dto/update-user.dto';
import UserService from '@/user/user.service';
import { HASH_SALT } from '@/utils/constants';

jest.mock('bcrypt');

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Abcd1234',
        role: Role.USER,
      };

      const hashedPassword = 'hashedPasswordMock';

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (prismaService.user.create as jest.Mock).mockResolvedValue({} as any);

      const result = await userService.create(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, HASH_SALT);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: { ...createUserDto, password: hashedPassword },
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
      expect(result).toEqual({} as any);
    });

    it('should handle duplicate email', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Abcd1234',
        role: Role.USER,
      };

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPasswordMock');
      (prismaService.user.create as jest.Mock).mockRejectedValue({ code: 'P2002' });

      await expect(userService.create(createUserDto)).rejects.toThrow(BadRequestException);

      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, HASH_SALT);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: { ...createUserDto, password: 'hashedPasswordMock' },
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
    });

    it('should handle other errors during user creation', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Abcd1234',
        role: Role.USER,
      };

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPasswordMock');
      (prismaService.user.create as jest.Mock).mockRejectedValue(new Error('Some unexpected error'));

      await expect(userService.create(createUserDto)).rejects.toThrow(BadRequestException);

      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, HASH_SALT);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: { ...createUserDto, password: 'hashedPasswordMock' },
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{}, {}] as any;

      (prismaService.user.findMany as jest.Mock).mockResolvedValue(users);

      const result = await userService.findAll();

      expect(prismaService.user.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userId = 'userIdMock';
      const user = {} as any;

      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(user);

      const result = await userService.findOne(userId);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
      expect(result).toEqual(user);
    });

    it('should throw BadRequestException if user not found by ID', async () => {
      const userId = 'userIdMock';

      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(userService.findOne(userId)).rejects.toThrow(
        new BadRequestException(`User with ID ${userId} not found`)
      );

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const userId = 'userIdMock';
      const updateUserDto: UpdateUserDto = { name: 'UpdatedName' };
      const user = {} as any;

      (prismaService.user.update as jest.Mock).mockResolvedValue(user);

      const result = await userService.update(userId, updateUserDto);

      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
        data: updateUserDto,
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
      expect(result).toEqual(user);
    });

    it('should handle duplicate email during update', async () => {
      const userId = 'userIdMock';
      const updateUserDto: UpdateUserDto = { email: 'john.doe@example.com' };

      (prismaService.user.update as jest.Mock).mockRejectedValue({ code: 'P2002' });

      await expect(userService.update(userId, updateUserDto)).rejects.toThrow(BadRequestException);

      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
        data: updateUserDto,
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
    });

    it('should handle other errors during user update', async () => {
      const userId = 'userIdMock';
      const updateUserDto: UpdateUserDto = { name: 'UpdatedName' };

      (prismaService.user.update as jest.Mock).mockRejectedValue(new Error('Some unexpected error'));

      await expect(userService.update(userId, updateUserDto)).rejects.toThrow(NotFoundException);

      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
        data: updateUserDto,
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      const userId = 'userIdMock';
      const user = {} as any;

      (prismaService.user.delete as jest.Mock).mockResolvedValue(user);

      const result = await userService.remove(userId);

      expect(prismaService.user.delete).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
      expect(result).toEqual(user);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'john.doe@example.com';
      const user = {} as any;

      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(user);

      const result = await userService.findByEmail(email);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: {
          email,
        },
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
      expect(result).toEqual(user);
    });
  });

  describe('comparePassword', () => {
    it('should compare passwords and return true for a valid match', async () => {
      const password = 'Abcd1234';
      const hashedPassword = 'hashedPasswordMock';

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await userService.comparePassword(password, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toEqual(true);
    });

    it('should compare passwords and return false for an invalid match', async () => {
      const password = 'Abcd1234';
      const hashedPassword = 'hashedPasswordMock';

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await userService.comparePassword(password, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toEqual(false);
    });
  });
});
