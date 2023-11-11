import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator';

class CreateBrandDto {
  @ApiProperty({
    type: 'String',
    description: 'The name of the brand',
    example: 'Asus',
  })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'The brand name must only contain letters and spaces',
  })
  @MaxLength(15, {
    message: 'The brand name must be at most 15 characters',
  })
  @MinLength(2, {
    message: 'The brand name must be at least 2 characters',
  })
  @IsNotEmpty({
    message: 'The brand name must not be empty',
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '))
  @Transform(({ value }) => value.trim())
  @IsString({
    message: 'The brand name must be a string',
  })
  readonly name: string;

  @ApiProperty({
    type: 'String',
    description: 'The logo URL of the brand',
    example: 'https://test-logo.com/test.png',
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
  @IsNotEmpty({
    message: 'The brand logo URL must not be empty',
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '))
  @Transform(({ value }) => value.trim())
  @IsString({
    message: 'The brand logo URL of the brand must be a string',
  })
  readonly logo: string;
}

export default CreateBrandDto;
