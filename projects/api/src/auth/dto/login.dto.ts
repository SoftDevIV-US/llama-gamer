import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

import { PASSWORD_VALIDATOR } from '@/utils/constants';

class LoginDto {
  @ApiProperty({
    type: 'String',
    description: 'The email of the user',
    example: 'john.doe@gmail.com',
  })
  @IsEmail(
    {},
    {
      message: 'The email must be a valid email address',
      groups: ['validate'],
    }
  )
  @IsNotEmpty({
    message: 'The email must not be empty',
    groups: ['validate'],
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '), {
    groups: ['transform'],
  })
  @Transform(({ value }) => value.trim(), {
    groups: ['transform'],
  })
  @IsString({
    message: 'The email must be a string',
    groups: ['validate'],
  })
  readonly email: string;

  @ApiProperty({
    type: 'String',
    description: 'The password of the user',
    example: 'AbadA312',
  })
  @Matches(PASSWORD_VALIDATOR, {
    message: 'The password only accepts letters, and numbers',
    groups: ['validate'],
  })
  @Length(8, 12, {
    message: 'The password must be between 8 and 12 characters',
    groups: ['validate'],
  })
  @IsNotEmpty({
    message: 'The password must not be empty',
    groups: ['validate'],
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '), {
    groups: ['transform'],
  })
  @Transform(({ value }) => value.trim(), {
    groups: ['transform'],
  })
  @IsString({
    message: 'The password must be a string',
    groups: ['validate'],
  })
  readonly password: string;
}

export default LoginDto;
