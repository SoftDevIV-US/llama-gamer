import { BadRequestException, Injectable } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';

import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import User from './entities/user.entity';

@Injectable()
class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: createUserDto,
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
      throw new BadRequestException(`User with ID ${id} not found`);
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
      throw new BadRequestException('Something went wrong');
    }
  }

  async remove(id: string): Promise<User> {
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
  }
}

export default UserService;
