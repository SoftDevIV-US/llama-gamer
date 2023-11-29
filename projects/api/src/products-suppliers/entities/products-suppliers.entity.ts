import { ApiProperty } from '@nestjs/swagger';

class ProductsSuppliers {
  @ApiProperty({
    type: 'string',
    description: 'The product supplier id',
    example: '123e4567-e89b-1r33-a456-426814174001',
  })
  readonly productId: string;

  @ApiProperty({
    type: 'string',
    description: 'The supplier id',
    example: '123e4567-e89b-1r33-a456-426814174001',
  })
  readonly supplierId: string;

  @ApiProperty({
    type: 'Date',
    description: 'The date and time when the product supplier was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  readonly createdAt: Date;
}

export default ProductsSuppliers;
