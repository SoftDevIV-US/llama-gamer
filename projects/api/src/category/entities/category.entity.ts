import { ApiProperty } from '@nestjs/swagger';

class Category {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'The unique ID of the category',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'The name of the category',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'The image of the category',
  })
  image: string;

  @ApiProperty({
    type: 'date',
    description: 'The creation date of the category',
  })
  createdAt: Date;

  @ApiProperty({
    type: 'date',
    description: 'The last updated date of the category',
  })
  updatedAt: Date;
}

export default Category;
