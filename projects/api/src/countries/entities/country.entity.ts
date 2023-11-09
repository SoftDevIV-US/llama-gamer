import { ApiProperty } from '@nestjs/swagger';

class Country {
  @ApiProperty({
    type: 'String',
    format: 'uuid',
    description: 'The unique ID of the country',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  readonly id: string;

  @ApiProperty({
    type: 'String',
    description: 'The name of the country',
    example: 'United States',
  })
  readonly name: string;

  @ApiProperty({
    type: 'Float',
    description: 'The tax of the country',
    example: '0.07',
  })
  readonly tax: number;

  @ApiProperty({
    type: 'Date',
    description: 'The date and time the country was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  readonly createdAt: Date;

  @ApiProperty({
    type: 'Date',
    description: 'The date and time the country was updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  readonly updatedAt: Date;
}

export default Country;
