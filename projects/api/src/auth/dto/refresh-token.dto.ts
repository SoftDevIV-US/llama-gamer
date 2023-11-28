import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

class RefreshTokenDto {
  @ApiProperty({
    type: 'String',
    description: 'The refresh token of the user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCVI9',
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '), {
    groups: ['transform'],
  })
  @Transform(({ value }) => value.trim(), {
    groups: ['transform'],
  })
  @IsNotEmpty({
    message: 'The refresh token must not be empty',
    groups: ['validate'],
  })
  @IsString({
    message: 'The refresh token must be a string',
    groups: ['validate'],
  })
  readonly refreshToken: string;
}

export default RefreshTokenDto;
