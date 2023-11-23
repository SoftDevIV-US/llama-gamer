import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import AdminAccess from '@/auth/decorators/admin.decorator';
import AdminGuard from '@/auth/guard/admin.guard';
import JwtAuthGuard from '@/auth/guard/jwt.guard';

import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import User from './entities/user.entity';
import UserService from './user.service';

@ApiTags('Users')
@Controller('users')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiCreatedResponse({ type: User, isArray: true })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiCreatedResponse({ type: User })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user by id' })
  @ApiCreatedResponse({ type: User })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiCreatedResponse({ type: User })
  async remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id);
  }
}

export default UserController;
