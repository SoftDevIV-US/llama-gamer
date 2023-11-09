import { ApiProperty } from '@nestjs/swagger';

class Category {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'The unique ID of the category',
    example: '1',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'The name of the category',
    example: 'Mouse',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'The image of the category',
    example: 'http://www.example.com/imagen1.png',
  })
  image: string;

  @ApiProperty({
    type: 'date',
    description: 'The creation date of the category',
    example: '2023-11-08',
  })
  createdAt: Date;

  @ApiProperty({
    type: 'date',
    description: 'The last updated date of the category',
    example: '2023-11-09',
  })
  updatedAt: Date;
}

export default Category;
