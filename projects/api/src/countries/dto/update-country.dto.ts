import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

class UpdateCountryDto {
  @ApiProperty({
    type: 'String',
    description: 'The name of the country',
    example: 'United States',
  })
  @IsString({
    message: 'The country name must be a string',
  })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: 'The country name must not be empty',
  })
  @MinLength(3, {
    message: 'The country name must be at least 3 characters',
  })
  @MaxLength(20, {
    message: 'The country name be at most 20 characters',
  })
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'The country must contain only letters and spaces',
  })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    type: 'Float',
    description: 'The tax of the country',
    example: '0.07',
  })
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message: 'The country tax must be a number, and have at most 2 decimal places',
    }
  )
  @IsPositive({
    message: 'The country tax must be a positive number',
  })
  @Max(50, {
    message: 'The country tax must be at most 50',
  })
  @IsOptional()
  readonly tax?: number;
}

export default UpdateCountryDto;
