import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString, Max, MaxLength, MinLength } from 'class-validator';

class UpdateCountryDto {
  @ApiProperty({
    type: 'String',
    description: 'The name of the country',
    example: 'United States',
  })
  @IsString({
    message: 'Name must be a string',
  })
  @MinLength(3, {
    message: 'Name must be at least 3 characters',
  })
  @MaxLength(20, {
    message: 'Name must be at most 20 characters',
  })
  @IsOptional()
  name?: string;

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
  @IsOptional()
  tax?: number;
}

export default UpdateCountryDto;
