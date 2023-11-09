import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, Max } from 'class-validator';

class CreateSupplierDto {
  @ApiProperty({
    type: 'String',
    description: 'The email of the supplier',
    example: 'intel@gmail.com',
  })
  @IsString({
    message: 'Email must be a string',
  })
  email: string;

  @ApiProperty({
    type: 'Integer',
    description: 'The delivery time in days for the product',
    example: '5',
  })
  @IsNumber()
  @IsPositive({
    message: 'Delivery time must be a positive number',
  })
  @Max(180, {
    message: 'Delivery time must be at most 180',
  })
  deliveryTime: number;

  @ApiProperty({
    type: 'String',
    description: 'The ID of the country of the supplier',
    example: '123e4567-e89b-12d3-a456-426814174001',
  })
  @IsString({
    message: 'ID must be a string',
  })
  countryId: string;
}

export default CreateSupplierDto;
