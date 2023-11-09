import { ApiProperty } from '@nestjs/swagger';

class Category {
  @ApiProperty({
    type: 'String',
    format: 'uuid',
    description: 'The unique ID of the category',
    example: 'f6a5d5c0-7e3a-4f1f-9d1e-3e5d8e5f8a3e',
  })
  readonly id: string;

  @ApiProperty({
    type: 'String',
    description: 'The name of the category',
    example: 'Mouse',
  })
  readonly name: string;

  @ApiProperty({
    type: 'String',
    description: 'The image URL of the category',
    example: 'http://www.example.com/imagen1.png',
  })
  readonly image: string;

  @ApiProperty({
    type: 'Date',
    description: 'The date and time the category was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  readonly createdAt: Date;

  @ApiProperty({
    type: 'Date',
    description: 'The date and time the category was updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  readonly updatedAt: Date;
}

export default Category;
