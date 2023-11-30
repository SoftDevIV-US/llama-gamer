import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';

import CreateBrandDto from './dto/create-brand.dto';
import UpdateBrandDto from './dto/update-brand.dto';
import Brand from './entities/brand.entity';

@Injectable()
class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
      const brand: Brand = await this.prisma.brand.create({
        data: createBrandDto,
        include: {
          products: {
            orderBy: {
              name: 'asc',
            },
            include: {
              category: true,
              productImages: {
                orderBy: {
                  createdAt: 'desc',
                },
              },
            },
          },
        },
      });
      return brand;
    } catch (error) {
      if (error?.meta?.target?.includes('name')) {
        throw new BadRequestException('Brand name already exists');
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async findAll(): Promise<Brand[]> {
    const brands = await this.prisma.brand.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        products: {
          orderBy: {
            name: 'asc',
          },
          include: {
            category: true,
            productImages: {
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
      },
    });

    return brands;
  }

  async findOne(id: string): Promise<Brand> {
    const brand: Brand = await this.prisma.brand.findUnique({
      where: { id },
      include: {
        products: {
          orderBy: {
            name: 'asc',
          },
          include: {
            category: true,
            productImages: {
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
      },
    });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    try {
      const brand: Brand = await this.prisma.brand.update({
        where: {
          id,
        },
        data: updateBrandDto,
        include: {
          products: {
            orderBy: {
              name: 'asc',
            },
            include: {
              category: true,
              productImages: {
                orderBy: {
                  createdAt: 'desc',
                },
              },
            },
          },
        },
      });
      return brand;
    } catch (error) {
      if (error?.meta?.target?.includes('name')) {
        throw new BadRequestException('Brand name already exists');
      }
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<Brand> {
    try {
      const brand: Brand = await this.prisma.brand.delete({
        where: {
          id,
        },
        include: {
          products: {
            orderBy: {
              name: 'asc',
            },
            include: {
              category: true,
              productImages: {
                orderBy: {
                  createdAt: 'desc',
                },
              },
            },
          },
        },
      });
      return brand;
    } catch (error) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
  }
}

export default BrandService;
