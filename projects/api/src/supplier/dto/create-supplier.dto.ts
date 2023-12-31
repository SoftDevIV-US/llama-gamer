import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsPositive, IsString, Matches, Max } from 'class-validator';

class CreateSupplierDto {
  @ApiProperty({
    type: 'String',
    description: 'The supplier email',
    example: 'intel@gmail.com',
  })
  @Matches(/^[a-zA-Z0-9]+([_]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email format. Only @ . and _ before the @ are allowed as special characters.',
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
    description: 'The supplier delivery time in days',
    example: '5',
  })
  @Max(180, {
    message: 'The supplier delivery time must be at most 180',
  })
  @IsPositive({
    message: 'The supplier delivery time must be a positive number',
  })
  @IsInt({
    message: 'The supplier delivery time must be an integer number',
  })
  readonly deliveryTime: number;

  @ApiProperty({
    type: 'String',
    description: 'The supplier country ID',
    example: '123e4567-e89b-12d3-a456-426814174001',
  })
  @Matches(/^[a-zA-Z0-9-]/, {
    message: 'The country ID must contain only alphanumeric characters and -',
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
