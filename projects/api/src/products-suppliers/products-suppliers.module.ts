import { Module } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';

import ProductsSuppliersController from './products-suppliers.controller';
import ProductsSuppliersService from './products-suppliers.service';

@Module({
  controllers: [ProductsSuppliersController],
  providers: [ProductsSuppliersService, PrismaService],
})
class ProductsSuppliersModule {}

export default ProductsSuppliersModule;
