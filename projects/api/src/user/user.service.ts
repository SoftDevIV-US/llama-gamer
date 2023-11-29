import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import PrismaService from '@/prisma/prisma.service';
import { HASH_SALT } from '@/utils/constants';

import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import User from './entities/user.entity';

@Injectable()
class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, HASH_SALT);
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
      return user;
    } catch (error) {
      if (error?.code === 'P2002') {
        throw new BadRequestException('User email already exists');
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
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
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        penalty: true,
        wishList: true,
        purchases: true,
        usersProducts: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: updateUserDto,
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
      return user;
    } catch (error) {
      if (error?.code === 'P2002') {
        throw new BadRequestException('User email already exists');
      }
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id,
        },
        include: {
          penalty: true,
          wishList: true,
          purchases: true,
          usersProducts: true,
        },
      });
      return user;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
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

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
  }
}

export default UserService;
