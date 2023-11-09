import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsPositive, IsString, Matches, Max, MaxLength, MinLength } from 'class-validator';

class CreateCountryDto {
  @ApiProperty({
    type: 'String',
    description: 'The name of the country',
    example: 'United States',
  })
  @IsString({
    message: 'Name must be a string',
  })
  @Transform(({ value }) => value.trim())
  @MinLength(3, {
    message: 'Name must be at least 3 characters',
  })
  @MaxLength(20, {
    message: 'Name must be at most 20 characters',
  })
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'Name must contain only letters and spaces',
  })
  readonly name: string;

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
      message: 'Tax must be a number, and have at most 2 decimal places',
    }
  )
  @IsPositive({
    message: 'Tax must be a positive number',
  })
  @Max(50, {
    message: 'Tax must be at most 50',
  })
  readonly tax: number;
}

export default CreateCountryDto;
