import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';

import CreateProductImageDto from './dto/create-product-image.dto';
import UpdateProductImageDto from './dto/update-product-image.dto';
import ProductImage from './entities/product-image.entity';

@Injectable()
class ProductImageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductImageDto: CreateProductImageDto): Promise<ProductImage> {
    try {
      const productImage: ProductImage = await this.prisma.productImage.create({
        data: createProductImageDto,
      });
      return productImage;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async findAll(): Promise<ProductImage[]> {
    const productImages: ProductImage[] = await this.prisma.productImage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return productImages;
  }

  async findOne(id: string) {
    const productImage: ProductImage = await this.prisma.productImage.findUnique({
      where: {
        id,
      },
    });

    if (!productImage) {
      throw new NotFoundException(`Product image with ${id} not found`);
    }

    return productImage;
  }

  async update(id: string, updateProductImageDto: UpdateProductImageDto) {
    try {
      const productImage: ProductImage = await this.prisma.productImage.update({
        where: {
          id,
        },
        data: updateProductImageDto,
      });
      return productImage;
    } catch (error) {
      throw new NotFoundException(`Product image with ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      const productImage: ProductImage = await this.prisma.productImage.delete({
        where: {
          id,
        },
      });
      return productImage;
    } catch (error) {
      throw new NotFoundException(`Product image with ${id} not found`);
    }
  }
}

export default ProductImageService;
