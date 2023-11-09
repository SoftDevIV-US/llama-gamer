import { ApiProperty } from '@nestjs/swagger';

class Brand {
  @ApiProperty({
    type: 'String',
    format: 'uuid',
    description: 'The unique ID of the brand',
    example: 'd0f02b9c-1d9a-4f1a-9e2a-3d9a3b0c4c7e',
  })
  readonly id: string;

  @ApiProperty({
    type: 'String',
    description: 'The name of the brand',
    example: 'Asus',
  })
  readonly name: string;

  @ApiProperty({
    type: 'String',
    description: 'The logo URL of the brand',
    example: 'https://test-logo.com/test.png',
  })
  readonly logo: string;

  @ApiProperty({
    type: 'Date',
    description: 'The date and time the brand was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  readonly createdAt: Date;

  @ApiProperty({
    type: 'Date',
    description: 'The date and time the brand was updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  readonly updatedAt: Date;
}

export default Brand;
