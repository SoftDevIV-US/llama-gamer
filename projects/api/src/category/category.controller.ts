import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import AdminAccess from '@/auth/decorators/admin.decorator';
import AdminGuard from '@/auth/guard/admin.guard';
import JwtAuthGuard from '@/auth/guard/jwt.guard';

import CategoryService from './category.service';
import CreateCategoryDto from './dto/create-category.dto';
import UpdateCategoryDto from './dto/update-category.dto';
import Category from './entities/category.entity';

@Controller('categories')
@ApiTags('Categories')
class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiCreatedResponse({ type: Category })
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category: Category = await this.categoryService.create(createCategoryDto);
    return category;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiCreatedResponse({ type: Category, isArray: true })
  async findAll(): Promise<Category[]> {
    const categories: Category[] = await this.categoryService.findAll();
    return categories;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a category by id' })
  @ApiCreatedResponse({ type: Category })
  async findOne(@Param('id') id: string): Promise<Category> {
    const category: Category = await this.categoryService.findOne(id);
    return category;
  }

  @Patch(':id')
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a category by id' })
  @ApiCreatedResponse({ type: Category })
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const updatedCategory: Category = await this.categoryService.update(id, updateCategoryDto);
    return updatedCategory;
  }

  @Delete(':id')
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a category by id' })
  @ApiCreatedResponse({ type: Category })
  async remove(@Param('id') id: string): Promise<Category> {
    const removedCategory: Category = await this.categoryService.remove(id);
    return removedCategory;
  }
}

export default CategoryController;
