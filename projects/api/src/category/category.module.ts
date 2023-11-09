import { Module } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';

import CategoryController from './category.controller';
import CategoryService from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
})
class CategoryModule {}

export default CategoryModule;
