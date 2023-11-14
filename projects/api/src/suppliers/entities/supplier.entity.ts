import { ApiProperty } from '@nestjs/swagger';

class Supplier {
  @ApiProperty({
    type: 'String',
    format: 'uuid',
    description: 'The unique ID of the supplier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  readonly id: string;

  @ApiProperty({
    type: 'String',
    description: 'The email of the supplier',
    example: 'intel@gmail.com',
  })
  readonly email: string;

  @ApiProperty({
    type: 'Integer',
    description: 'The delivery time in days for the product',
    example: '5',
  })
  readonly deliveryTime: number;

  @ApiProperty({
    type: 'Date',
    description: 'The date the supplier was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  readonly createdAt: Date;

  @ApiProperty({
    type: 'Date',
    description: 'The date the supplier was updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  readonly updatedAt: Date;

  @ApiProperty({
    type: 'String',
    format: 'uuid',
    description: 'The ID of the country of the supplier',
    example: '123e4567-e89b-12d3-a456-426814174001',
  })
  readonly countryId: string;
}

export default Supplier;
