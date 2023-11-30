import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';

import CreateCategoryDto from './dto/create-category.dto';
import UpdateCategoryDto from './dto/update-category.dto';
import Category from './entities/category.entity';

@Injectable()
class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category: Category = await this.prisma.category.create({
        data: createCategoryDto,
        include: {
          products: {
            orderBy: {
              stock: 'desc',
            },
            include: {
              productImages: {
                orderBy: {
                  createdAt: 'desc',
                },
              },
            },
          },
        },
      });

      return category;
    } catch (error) {
      if (error?.meta?.target?.includes('name')) {
        throw new BadRequestException('Category name already exists');
      } else {
        throw new BadRequestException('Something went wrong');
      }
    }
  }

  async findAll(): Promise<Category[]> {
    const categories: Category[] = await this.prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        products: {
          orderBy: {
            stock: 'desc',
          },
          include: {
            productImages: {
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
      },
    });

    return categories;
  }

  async findOne(id: string): Promise<Category> {
    const category: Category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          orderBy: {
            stock: 'desc',
          },
          include: {
            productImages: {
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(categoryId: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    try {
      const updatedCategory = await this.prisma.category.update({
        where: {
          id: categoryId,
        },
        data: updateCategoryDto,
        include: {
          products: {
            orderBy: {
              stock: 'desc',
            },
            include: {
              productImages: {
                orderBy: {
                  createdAt: 'desc',
                },
              },
            },
          },
        },
      });
      return updatedCategory;
    } catch (error) {
      if (error?.meta?.target?.includes('name')) {
        throw new BadRequestException('Category name already exists');
      } else {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }
    }
  }

  async remove(id: string): Promise<Category> {
    try {
      const deletedCategory = await this.prisma.category.delete({
        where: { id },
        include: {
          products: {
            orderBy: {
              stock: 'desc',
            },
            include: {
              productImages: {
                orderBy: {
                  createdAt: 'desc',
                },
              },
            },
          },
        },
      });

      return deletedCategory;
    } catch (error) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}

export default CategoryService;
