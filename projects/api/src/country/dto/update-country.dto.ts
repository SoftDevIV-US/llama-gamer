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

import { NAME_VALIDATOR } from '@/utils/constants';

class UpdateCountryDto {
  @ApiProperty({
    type: 'String',
    description: 'The name of the country',
    example: 'United States',
  })
  @Matches(NAME_VALIDATOR, {
    message: 'The country must contain only letters and spaces',
  })
  @MaxLength(20, {
    message: 'The country name be at most 20 characters',
  })
  @MinLength(3, {
    message: 'The country name must be at least 3 characters',
  })
  @IsNotEmpty({
    message: 'The country name must not be empty',
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '))
  @Transform(({ value }) => value.trim())
  @IsString({
    message: 'The country name must be a string',
  })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    type: 'Float',
    description: 'The tax of the country',
    example: '0.07',
  })
  @Max(50, {
    message: 'The country tax must be at most 50',
  })
  @IsPositive({
    message: 'The country tax must be a positive number',
  })
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message: 'The country tax must be a number, and have at most 2 decimal places',
    }
  )
  @IsOptional()
  readonly tax?: number;
}

export default UpdateCountryDto;
