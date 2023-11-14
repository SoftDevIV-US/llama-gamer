import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsPositive, IsString, Max } from 'class-validator';

class UpdateSupplierDto {
  @ApiProperty({
    type: 'String',
    description: 'The supplier email',
    example: 'intel@gmail.com',
  })
  @IsEmail()
  @Transform(({ value }) => value.replace(/\s+/g, ' '))
  @Transform(({ value }) => value.trim())
  @IsString({
    message: 'The supplier email must be a string',
  })
  @IsOptional()
  readonly email?: string;

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
  @IsNumber()
  @IsOptional()
  readonly deliveryTime?: number;

  @ApiProperty({
    type: 'String',
    description: 'The supplier country ID',
    example: '123e4567-e89b-12d3-a456-426814174001',
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '))
  @Transform(({ value }) => value.trim())
  @IsString({
    message: 'The supplier country ID must be a string',
  })
  @IsOptional()
  readonly countryId?: string;
}

export default UpdateSupplierDto;
