import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

class CreateCategoryDto {
  @ApiProperty({
    type: 'string',
    description: 'The name of the category',
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
  @Transform(({ value }) => value.trim())
  readonly name: string;

  @ApiProperty({
    type: 'string',
    description: 'The image of the category',
    example: 'http://www.example.com/imagen1.png',
  })
  @IsNotEmpty({
    message: 'The category image can not be empty',
  })
  @IsString({
    message: 'The category image must be a string',
  })
  readonly image: string;
}

export default CreateCategoryDto;
