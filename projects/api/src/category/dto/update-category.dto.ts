import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

class UpdateCategoryDto {
  @ApiProperty({
    type: 'string',
    description: 'The name to update the category',
    example: 'Mouse',
  })
  @IsString({
    message: 'The category title must be a string',
  })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must only contain letters and spaces',
  })
  @MinLength(4, {
    message: 'Name must be at least 4 characters long',
  })
  @MaxLength(30, {
    message: 'Name must be at most 30 characters long',
  })
  @IsNotEmpty({
    message: 'The category title must have at least one character',
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: 'string',
    description: 'The image of the category',
  })
  @IsNotEmpty({
    message: 'The category image can not be empty',
  })
  @IsString({
    message: 'The category image must be a string',
  })
  @IsOptional()
  image?: string;
}

export default UpdateCategoryDto;
