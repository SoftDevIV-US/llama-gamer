import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class CreateCategoryDto {
  @ApiProperty({
    type: 'string',
    description: 'The name of the category',
  })
  @IsString({
    message: 'The category title must be a string',
  })
  @IsNotEmpty({
    message: 'The category title must have at least one character',
  })
  readonly name: string;

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
  readonly image: string;
}

export default CreateCategoryDto;
