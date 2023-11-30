import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';

import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import Product from './entities/product.entity';

@Injectable()
class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product: Product = await this.prisma.product.create({
        data: createProductDto,
        include: {
          category: true,
          brand: true,
          productImages: true,
          productsSuppliers: {
            select: {
              supplier: {
                include: {
                  country: true,
                },
              },
            },
          },
        },
      });
      return product;
    } catch (error) {
      if (error?.meta?.target?.includes('name')) {
        throw new BadRequestException('Product name already exists');
      } else {
        throw new BadRequestException('Something went wrong');
      }
    }
  }

  async findAll(): Promise<Product[]> {
    const products: Product[] = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
        brand: true,
        productImages: true,
        productsSuppliers: {
          select: {
            supplier: {
              include: {
                country: true,
              },
            },
          },
        },
      },
    });
    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product: Product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        brand: true,
        productImages: true,
        productsSuppliers: {
          include: {
            supplier: {
              include: {
                country: true,
              },
            },
          },
        },
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      const product: Product = await this.prisma.product.update({
        where: {
          id,
        },
        data: updateProductDto,
        include: {
          category: true,
          brand: true,
          productImages: true,
          productsSuppliers: {
            select: {
              supplier: {
                include: {
                  country: true,
                },
              },
            },
          },
        },
      });
      return product;
    } catch (error) {
      if (error?.meta?.target?.includes('name')) {
        throw new BadRequestException('Product name already exists');
      }
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      const product: Product = await this.prisma.product.delete({
        where: {
          id,
        },
        include: {
          category: true,
          brand: true,
          productImages: true,
          productsSuppliers: {
            select: {
              supplier: {
                include: {
                  country: true,
                },
              },
            },
          },
        },
      });
      return product;
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
export default ProductService;
