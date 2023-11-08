import { Module } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';

import BrandController from './brand.controller';
import BrandService from './brand.service';

@Module({
  controllers: [BrandController],
  providers: [BrandService, PrismaService],
})
class BrandModule {}
export default BrandModule;
