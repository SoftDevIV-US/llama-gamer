import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl, Length, Matches } from 'class-validator';

class CreateBrandDto {
  @ApiProperty({
    type: String,
    description: 'The name of the brand like: asus, samsung, msi',
  })
  @IsString({
    message: 'The brand name must be a string',
  })
  @IsNotEmpty({
    message: 'The brand name must not be empty',
  })
  @Length(2, 15, {
    message: 'The brand name must be between 2 and 15 characters',
  })
  @Matches(/^[A-Za-z]+$/, {
    message: 'The brand name must contain only alphabetic characters',
  })
  @Transform(({ value }) => value.trim())
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'The logo URL of the brand like: https://test-logo.com/test.png',
  })
  @IsString({
    message: 'The URL of the brand must be a string',
  })
  @IsNotEmpty({
    message: 'The brand URL must not be empty',
  })
  @IsUrl(
    {},
    {
      message: 'The logo URL is not a valid URL',
    }
  )
  @Transform(({ value }) => value.trim())
  readonly logo: string;
}

export default CreateBrandDto;
