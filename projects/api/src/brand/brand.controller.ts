import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import BrandService from './brand.service';
import CreateBrandDto from './dto/create-brand.dto';
import UpdateBrandDto from './dto/update-brand.dto';
import Brand from './entities/brand.entity';

@Controller('brands')
@ApiTags('Brands')
class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiCreatedResponse({ type: Brand })
  async create(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand: Brand = await this.brandService.create(createBrandDto);
    return brand;
  }

  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  @ApiCreatedResponse({ type: Brand, isArray: true })
  async findAll(): Promise<Brand[]> {
    const brands: Brand[] = await this.brandService.findAll();
    return brands;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a brand by id' })
  @ApiCreatedResponse({ type: Brand })
  async findOne(@Param('id') id: string): Promise<Brand> {
    const brand: Brand = await this.brandService.findOne(id);
    return brand;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a brand by id' })
  @ApiCreatedResponse({ type: Brand })
  async update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand: Brand = await this.brandService.update(id, updateBrandDto);
    return brand;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a brand by id' })
  @ApiCreatedResponse({ type: Brand })
  async remove(@Param('id') id: string): Promise<Brand> {
    const brand: Brand = await this.brandService.remove(id);
    return brand;
  }
}

export default BrandController;
