import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator';

class UpdateCategoryDto {
  @ApiProperty({
    type: 'String',
    description: 'The name of the category',
    example: 'Mouse',
  })
  @IsString({
    message: 'The category name must be a string',
  })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: 'The category name must not be empty',
  })
  @MinLength(4, {
    message: 'The category name must be at least 4 characters long',
  })
  @MaxLength(30, {
    message: 'The category name must be at most 30 characters long',
  })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'The category name must only contain letters and spaces',
  })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    type: 'String',
    description: 'The image URL of the category',
    example: 'http://www.example.com/imagen1.png',
  })
  @IsString({
    message: 'The category image URL must be a string',
  })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: 'The category image URL must not be empty',
  })
  @IsUrl(
    {
      require_protocol: true,
      require_valid_protocol: true,
    },
    {
      message: 'The category image URL must be a valid URL',
    }
  )
  @IsOptional()
  readonly image?: string;
}

export default UpdateCategoryDto;
