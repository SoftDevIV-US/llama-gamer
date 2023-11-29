import { ApiProperty } from '@nestjs/swagger';

class ProductImage {
  @ApiProperty({
    type: 'string',
    description: 'The product image id',
    example: '123e4567-e89b-1r33-a456-426814174001',
  })
  readonly id: string;

  @ApiProperty({
    type: 'string',
    format: 'URL',
    description: 'The product image URL',
    example: 'https://example.com/image.png',
  })
  readonly image: string;

  @ApiProperty({
    type: 'Date',
    description: 'The date and time when the product image was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  readonly createdAt: Date;

  @ApiProperty({
    type: 'Date',
    description: 'The date and time when the product image was updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  readonly updatedAt: Date;

  @ApiProperty({
    type: 'string',
    description: 'The product id',
    example: '123e4567-e89b-1r33-a456-426814174001',
  })
  readonly productId: string;
}

export default ProductImage;
