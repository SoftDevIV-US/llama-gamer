import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer/types/decorators';
import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, Max } from 'class-validator';

class CreateSupplierDto {
  @ApiProperty({
    type: 'String',
    description: 'The supplier email',
    example: 'intel@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty({
    message: 'The supplier email must not be empty',
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '))
  @Transform(({ value }) => value.trim())
  @IsString({
    message: 'The supplier email must be a string',
  })
  readonly email: string;

  @ApiProperty({
    type: 'Integer',
    description: 'The product delivery time in days',
    example: '5',
  })
  @Max(180, {
    message: 'The delivery time must be at most 180',
  })
  @IsPositive({
    message: 'The delivery time must be a positive number',
  })
  @IsNumber()
  readonly deliveryTime: number;

  @ApiProperty({
    type: 'String',
    description: 'The supplier country ID',
    example: '123e4567-e89b-12d3-a456-426814174001',
  })
  @IsNotEmpty({
    message: 'The supplier country ID must not be empty',
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '))
  @Transform(({ value }) => value.trim())
  @IsString({
    message: 'The supplier country ID must be a string',
  })
  readonly countryId: string;
}

export default CreateSupplierDto;
