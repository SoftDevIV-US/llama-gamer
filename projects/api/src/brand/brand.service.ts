import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '@prisma/client';

import PrismaService from '@/prisma/prisma.service';

import CreateBrandDto from './dto/create-brand.dto';
import UpdateBrandDto from './dto/update-brand.dto';

@Injectable()
class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
      return await this.prisma.brand.create({
        data: createBrandDto,
      });
    } catch (error) {
      if (error?.meta?.target?.includes('name')) {
        throw new BadRequestException('Brand name already exists');
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async findAll(): Promise<Brand[]> {
    return this.prisma.brand.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string): Promise<Brand> {
    const brand: Brand = await this.prisma.brand.findUnique({
      where: { id },
    });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    try {
      return await this.prisma.brand.update({
        where: { id },
        data: updateBrandDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      } else if (error.meta?.target?.includes('name')) {
        throw new BadRequestException('Brand name already exists');
      } else {
        throw new BadRequestException('Something went wrong during brand update');
      }
    }
  }

  async remove(id: string): Promise<Brand> {
    try {
      return await this.prisma.brand.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      } else {
        throw new BadRequestException('Something went wrong during brand removal');
      }
    }
  }
}

export default BrandService;
