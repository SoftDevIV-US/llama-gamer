import { ApiProperty } from '@nestjs/swagger';

class Country {
  @ApiProperty({
    type: 'String',
    format: 'uuid',
    description: 'The ID of the country',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    type: 'String',
    description: 'The name of the country',
    example: 'United States',
  })
  name: string;

  @ApiProperty({
    type: 'Float',
    description: 'The tax of the country',
    example: '0.07',
  })
  tax: number;

  @ApiProperty({
    type: 'Date',
    description: 'The date the country was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: 'Date',
    description: 'The date the country was updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

export default Country;
