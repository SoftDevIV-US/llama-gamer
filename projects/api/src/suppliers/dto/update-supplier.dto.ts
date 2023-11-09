import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString, Max } from 'class-validator';

class UpdateSupplierDto {
  @ApiProperty({
    type: 'String',
    description: 'The email of the supplier',
    example: 'intel@gmail.com',
  })
  @IsString({
    message: 'Email must be a string',
  })
  @IsOptional()
  email?: string;

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
  @IsOptional()
  deliveryTime?: number;

  @ApiProperty({
    type: 'String',
    description: 'The ID of the country of the supplier',
    example: '123e4567-e89b-12d3-a456-426814174001',
  })
  @IsString({
    message: 'ID must be a string',
  })
  @IsOptional()
  countryId?: string;
}

export default UpdateSupplierDto;
