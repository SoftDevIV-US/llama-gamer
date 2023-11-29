import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class UpdateProductsSupplierDto {
  @ApiProperty({
    type: 'string',
    description: 'The product id',
    example: '123e4567-e89b-1r33-a456-426814174001',
  })
  @IsNotEmpty({
    message: 'The product id is required',
    groups: ['validate'],
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '), { groups: ['transform'] })
  @Transform(({ value }) => value.trim(), { groups: ['transform'] })
  @IsString({
    message: 'The product id must be a string',
    groups: ['validate'],
  })
  @IsOptional()
  readonly productId?: string;

  @ApiProperty({
    type: 'string',
    description: 'The supplier id',
    example: '123e4567-e89b-1r33-a456-426814174001',
  })
  @IsNotEmpty({
    message: 'The supplier id is required',
    groups: ['validate'],
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '), { groups: ['transform'] })
  @Transform(({ value }) => value.trim(), { groups: ['transform'] })
  @IsString({
    message: 'The supplier id must be a string',
    groups: ['validate'],
  })
  @IsOptional()
  readonly supplierId?: string;
}

export default UpdateProductsSupplierDto;
