import { BadRequestException } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';
import CreateUserDto from '@/user/dto/create-user.dto';
import UpdateUserDto from '@/user/dto/update-user.dto';
import User from '@/user/entities/user.entity';
import UserService from '@/user/user.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    userService = new UserService(prismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        role: 'USER',
      };

      const createdUser: User = {
        id: '1',
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        penalty: null,
        wishList: null,
        purchases: [],
        usersProducts: [],
      };

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(createdUser);

      const result = await userService.create(createUserDto);

      expect(result).toEqual(createdUser);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: createUserDto,
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
    });

    it('should throw BadRequestException if user email already exists', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        role: 'USER',
      };

      jest.spyOn(prismaService.user, 'create').mockRejectedValue({ code: 'P2002' });

      await expect(userService.create(createUserDto)).rejects.toThrow(BadRequestException);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: createUserDto,
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
    });

    it('should throw BadRequestException if something went wrong', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        role: 'USER',
      };

      jest.spyOn(prismaService.user, 'create').mockRejectedValue(new Error());

      await expect(userService.create(createUserDto)).rejects.toThrow(BadRequestException);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: createUserDto,
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
    it('should return all users', async () => {
      const users: User[] = [
        {
          id: '1',
          name: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password',
          role: 'USER',
          createdAt: new Date(),
          updatedAt: new Date(),
          penalty: null,
          wishList: null,
          purchases: [],
          usersProducts: [],
        },
        // Add more user objects as needed
      ];

      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users);

      const result = await userService.findAll();

      expect(result).toEqual(users);
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
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userId = '1';

      const user: User = {
        id: userId,
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        penalty: null,
        wishList: null,
        purchases: [],
        usersProducts: [],
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

      const result = await userService.findOne(userId);

      expect(result).toEqual(user);
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

    it('should throw BadRequestException if user not found', async () => {
      const userId = '1';

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(userService.findOne(userId)).rejects.toThrow(BadRequestException);
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
    it('should update a user', async () => {
      const userId = '1';
      const updateUserDto: UpdateUserDto = {
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        role: 'USER',
      };

      const updatedUser: User = {
        id: userId,
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        penalty: null,
        wishList: null,
        purchases: [],
        usersProducts: [],
      };

      jest.spyOn(prismaService.user, 'update').mockResolvedValue(updatedUser);

      const result = await userService.update(userId, updateUserDto);

      expect(result).toEqual(updatedUser);
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

    it('should throw BadRequestException if user email already exists', async () => {
      const userId = '1';
      const updateUserDto: UpdateUserDto = {
        email: 'john.doe@example.com',
      };

      jest.spyOn(prismaService.user, 'update').mockRejectedValue({ code: 'P2002' });

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

    it('should throw BadRequestException if something went wrong', async () => {
      const userId = '1';
      const updateUserDto: UpdateUserDto = {
        email: 'john.doe@example.com',
      };

      jest.spyOn(prismaService.user, 'update').mockRejectedValue(new Error());

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
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = '1';

      const removedUser: User = {
        id: userId,
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        penalty: null,
        wishList: null,
        purchases: [],
        usersProducts: [],
      };

      jest.spyOn(prismaService.user, 'delete').mockResolvedValue(removedUser);

      const result = await userService.remove(userId);

      expect(result).toEqual(removedUser);
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
    });
  });
});
