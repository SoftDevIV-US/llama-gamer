import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator';

class UpdateBrandDto {
  @ApiProperty({
    type: 'String',
    description: 'The name of the brand',
    example: 'Asus',
  })
  @IsString({
    message: 'The brand name must be a string',
  })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: 'The brand name must not be empty',
  })
  @MinLength(3, {
    message: 'The brand name must be at least 3 characters',
  })
  @MaxLength(15, {
    message: 'The brand name must be at most 15 characters',
  })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'The brand name must only contain letters and spaces',
  })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    type: 'String',
    description: 'The logo URL of the brand',
    example: 'https://test-logo.com/test.png',
  })
  @IsString({
    message: 'The brand logo URL of the brand must be a string',
  })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: 'The brand logo URL must not be empty',
  })
  @IsUrl(
    {
      require_protocol: true,
      require_valid_protocol: true,
    },
    {
      message: 'The brand logo URL must be a valid URL',
    }
  )
  @IsOptional()
  readonly logo?: string;
}

export default UpdateBrandDto;
