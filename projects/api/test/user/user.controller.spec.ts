import { Test, TestingModule } from '@nestjs/testing';

import CreateUserDto from '@/user/dto/create-user.dto';
import UpdateUserDto from '@/user/dto/update-user.dto';
import User from '@/user/entities/user.entity';
import UserController from '@/user/user.controller';
import UserService from '@/user/user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
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

      jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

      const result = await userController.create(createUserDto);

      expect(result).toEqual(createdUser);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
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
      ];

      jest.spyOn(userService, 'findAll').mockResolvedValue(users);

      const result = await userController.findAll();

      expect(result).toEqual(users);
      expect(userService.findAll).toHaveBeenCalled();
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

      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      const result = await userController.findOne(userId);

      expect(result).toEqual(user);
      expect(userService.findOne).toHaveBeenCalledWith(userId);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
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

      jest.spyOn(userService, 'update').mockResolvedValue(updatedUser);

      const result = await userController.update(userId, updateUserDto);

      expect(result).toEqual(updatedUser);
      expect(userService.update).toHaveBeenCalledWith(userId, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
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

      jest.spyOn(userService, 'remove').mockResolvedValue(removedUser);

      const result = await userController.remove(userId);

      expect(result).toEqual(removedUser);
      expect(userService.remove).toHaveBeenCalledWith(userId);
    });
  });
});
