import { Module } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';
import ProductImageService from '@/product-image/product-image.service';
import ProductsSuppliersService from '@/products-suppliers/products-suppliers.service';

import ProductController from './product.controller';
import ProductService from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, ProductsSuppliersService, ProductImageService],
})
export default class ProductModule {}
