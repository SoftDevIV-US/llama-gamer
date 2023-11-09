import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import CategoryService from './category.service';
import CreateCategoryDto from './dto/create-category.dto';
import UpdateCategoryDto from './dto/update-category.dto';
import Category from './entities/category.entity';

@Controller('category')
@ApiTags('Category')
class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiCreatedResponse({ type: Category })
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category: Category = await this.categoryService.create(createCategoryDto);
    return category;
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiCreatedResponse({ isArray: true })
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get()
  @ApiOperation({ summary: 'Get a category by id' })
  @ApiCreatedResponse({ type: Category })
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by id' })
  @ApiCreatedResponse({ type: Category })
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by id' })
  @ApiCreatedResponse({ type: Category })
  async remove(@Param('id') id: string): Promise<Category> {
    return this.categoryService.remove(id);
  }
}

export default CategoryController;
