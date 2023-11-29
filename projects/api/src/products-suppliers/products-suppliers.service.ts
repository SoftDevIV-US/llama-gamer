import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';

import CreateProductsSupplierDto from './dto/create-products-suppliers.dto';
import UpdateProductsSupplierDto from './dto/update-products-suppliers.dto';
import ProductsSuppliers from './entities/products-suppliers.entity';

@Injectable()
class ProductsSuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductsSupplierDto: CreateProductsSupplierDto): Promise<ProductsSuppliers> {
    try {
      const productsSupplier: ProductsSuppliers = await this.prisma.productsSuppliers.create({
        data: createProductsSupplierDto,
      });
      return productsSupplier;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async findAll(): Promise<ProductsSuppliers[]> {
    const productsSuppliers: ProductsSuppliers[] = await this.prisma.productsSuppliers.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return productsSuppliers;
  }

  async findOne(productId: string, supplierId: string): Promise<ProductsSuppliers> {
    const productsSupplier: ProductsSuppliers = await this.prisma.productsSuppliers.findUnique({
      where: {
        productId_supplierId: {
          productId,
          supplierId,
        },
      },
    });

    if (!productsSupplier) {
      throw new NotFoundException(`Products supplier with ${productId} and ${supplierId} not found`);
    }

    return productsSupplier;
  }

  async update(
    productId: string,
    supplierId: string,
    updateProductsSupplierDto: UpdateProductsSupplierDto
  ): Promise<ProductsSuppliers> {
    try {
      const productsSupplier: ProductsSuppliers = await this.prisma.productsSuppliers.update({
        where: {
          productId_supplierId: {
            productId,
            supplierId,
          },
        },
        data: updateProductsSupplierDto,
      });
      return productsSupplier;
    } catch (error) {
      throw new NotFoundException(`Products supplier with ${productId} and ${supplierId} not found`);
    }
  }

  async remove(productId: string, supplierId: string) {
    try {
      const productsSupplier: ProductsSuppliers = await this.prisma.productsSuppliers.delete({
        where: {
          productId_supplierId: {
            productId,
            supplierId,
          },
        },
      });
      return productsSupplier;
    } catch (error) {
      throw new NotFoundException(`Products supplier with ${productId} and ${supplierId} not found`);
    }
  }
}

export default ProductsSuppliersService;
