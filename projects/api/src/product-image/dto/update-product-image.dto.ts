import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

class UpdateProductImageDto {
  @ApiProperty({
    type: 'string',
    format: 'URL',
    description: 'The product image URL',
    example: 'https://example.com/image.png',
  })
  @IsUrl(
    {
      require_protocol: true,
      require_valid_protocol: true,
    },
    {
      message: 'The product image URL must be a valid URL',
      groups: ['validate'],
    }
  )
  @IsNotEmpty({
    message: 'The product image URL is required',
    groups: ['validate'],
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '), { groups: ['transform'] })
  @Transform(({ value }) => value.trim(), { groups: ['transform'] })
  @IsString({
    message: 'The product image URL must be a string',
    groups: ['validate'],
  })
  @IsOptional()
  readonly image?: string;

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
}

export default UpdateProductImageDto;
