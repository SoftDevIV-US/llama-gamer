import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString, Matches, MaxLength, Min, MinLength } from 'class-validator';

import { PRODUCT_NAME_VALIDATOR } from '@/utils/constants';

class CreateProductDto {
  @ApiProperty({
    type: 'String',
    description: 'The name of the Product',
    example: 'Keyboard Red Dragon',
  })
  @Matches(PRODUCT_NAME_VALIDATOR, {
    message: 'The product name must only contain letters, numbers, blank spaces and hyphens.',
  })
  @MaxLength(50, {
    message: 'The product name must be at most 50 characters',
  })
  @MinLength(3, {
    message: 'The product name must be at least 3 characters',
  })
  @IsNotEmpty({
    message: 'The product name must not be empty',
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '))
  @Transform(({ value }) => value.trim())
  readonly name: string;

  @ApiProperty({
    type: 'String',
    description: 'The description of the product',
    example:
      'Experience cable-free freedom and exceptional performance with our Wireless RGB Mechanical Keyboard. Its high-quality switches provide precise tactile responses, while the customizable RGB backlight adds a stylish touch to your workspace. With low-latency wireless connectivity, outstanding durability, and an ergonomic design, this keyboard is the perfect choice for gamers and professionals seeking the ideal balance of form and function.',
  })
  @MaxLength(1000, {
    message: 'The product description must be at most 1000 characters',
  })
  @MinLength(1, {
    message: 'The product description must be at least 1 characters',
  })
  @IsNotEmpty({
    message: 'The product description must not be empty',
  })
  readonly description: string;

  @ApiProperty({
    type: 'Integer',
    description: 'The stock of the product',
    example: '190',
  })
  @Min(180, {
    message: 'The product stock must be at most 180',
  })
  @IsPositive({
    message: 'The product stock must be a positive number',
  })
  @IsNumber()
  readonly stock: number;

  @ApiProperty({
    type: 'Float',
    description: 'The price of the product',
    example: '0.07',
  })
  @IsPositive({
    message: 'The price must be a positive number',
  })
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message: 'The price must be a number, and have at most 2 decimal places',
    }
  )
  readonly price: number;

  @ApiProperty({
    type: 'String',
    description: 'The product category ID',
    example: '123e4567-e89b-1r33-a456-426814174001',
  })
  @IsNotEmpty({
    message: 'The product category ID must not be empty',
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '))
  @Transform(({ value }) => value.trim())
  @IsString({
    message: 'The product category ID must be a string',
  })
  readonly categoryId: string;

  @ApiProperty({
    type: 'String',
    description: 'The product brand ID',
    example: '123e4567-e89b-12d3-a456-408814174001',
  })
  @IsNotEmpty({
    message: 'The product brand ID must not be empty',
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '))
  @Transform(({ value }) => value.trim())
  @IsString({
    message: 'The product brand ID must be a string',
  })
  readonly brandId: string;
}
export default CreateProductDto;
