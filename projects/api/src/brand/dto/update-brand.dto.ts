import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl, Length, Matches } from 'class-validator';

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
  @Length(2, 15, {
    message: 'The brand name must be between 2 and 15 characters',
  })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'The brand name must contain only alphabetic characters',
  })
  readonly name: string;

  @ApiProperty({
    type: 'String',
    description: 'The logo URL of the brand',
    example: 'https://test-logo.com/test.png',
  })
  @IsString({
    message: 'The logo URL of the brand must be a string',
  })
  @Transform(({ value }) => value.trim())
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
