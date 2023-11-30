import { ApiProperty } from '@nestjs/swagger';

import PrismaCategory from '@/category/entities/prisma-category.entity';

import PrismaProduct from './prisma-product.entity';

class PrismaCategoryProduct extends PrismaProduct {
  @ApiProperty({
    type: () => PrismaCategory,
    description: 'The category of the product',
  })
  readonly category: PrismaCategory;
}

export default PrismaCategoryProduct;
