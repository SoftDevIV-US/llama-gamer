import { ApiProperty } from '@nestjs/swagger';

class Brand {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'The unique identifier of the brand',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'The name of the brand',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'The url logo of the brand',
  })
  logo: string;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: 'The date and time the brand was created',
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: 'The date and time the brand was updated',
  })
  updatedAt: Date;
}

export default Brand;
