import { ApiProperty } from '@nestjs/swagger';

import Supplier from '@/supplier/entities/supplier.entity';

class SuppliersOnly {
  @ApiProperty({
    type: () => Supplier,
    description: 'The supplier of the product',
  })
  readonly supplier: Supplier;
}

export default SuppliersOnly;
