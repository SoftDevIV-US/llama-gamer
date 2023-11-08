import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, Length, Matches } from 'class-validator';

class UpdateBrandDto {
  @ApiProperty({
    type: String,
    description: 'The name of the brand',
  })
  @IsString({
    message: 'The brand name must be a string',
  })
  @IsNotEmpty({
    message: 'The brand name must not be empty',
  })
  @Length(3, 15, {
    message: 'The brand name must be between 3 and 15 characters',
  })
  @IsString({
    message: 'The brand name must be a string',
  })
  @Matches(/^[A-Za-z]+$/, {
    message: 'The brand name must contain only alphabetic characters',
  })
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'The logo URL of the brand',
  })
  @IsString({
    message: 'The logo URL of the brand must be a string',
  })
  @IsNotEmpty({
    message: 'The brand logo URL must not be empty',
  })
  @IsUrl(
    {},
    {
      message: 'The logo URL provided is not a valid URL',
    }
  )
  readonly logo: string;
}

export default UpdateBrandDto;
