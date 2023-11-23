import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import AdminAccess from '@/auth/decorators/admin.decorator';
import AdminGuard from '@/auth/guard/admin.guard';
import JwtAuthGuard from '@/auth/guard/jwt.guard';

import BrandService from './brand.service';
import CreateBrandDto from './dto/create-brand.dto';
import UpdateBrandDto from './dto/update-brand.dto';
import Brand from './entities/brand.entity';

@Controller('brands')
@ApiTags('Brands')
class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiCreatedResponse({ type: Brand })
  async create(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand: Brand = await this.brandService.create(createBrandDto);
    return brand;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all brands' })
  @ApiCreatedResponse({ type: Brand, isArray: true })
  async findAll(): Promise<Brand[]> {
    const brands: Brand[] = await this.brandService.findAll();
    return brands;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a brand by id' })
  @ApiCreatedResponse({ type: Brand })
  async findOne(@Param('id') id: string): Promise<Brand> {
    const brand: Brand = await this.brandService.findOne(id);
    return brand;
  }

  @Patch(':id')
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a brand by id' })
  @ApiCreatedResponse({ type: Brand })
  async update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand: Brand = await this.brandService.update(id, updateBrandDto);
    return brand;
  }

  @Delete(':id')
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a brand by id' })
  @ApiCreatedResponse({ type: Brand })
  async remove(@Param('id') id: string): Promise<Brand> {
    const brand: Brand = await this.brandService.remove(id);
    return brand;
  }
}

export default BrandController;
