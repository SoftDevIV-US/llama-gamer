import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

import { NAME_VALIDATOR, PASSWORD_VALIDATOR } from '@/utils/constants';

class CreateUserDto {
  @ApiProperty({
    type: 'String',
    description: 'The name of the user',
    example: 'John',
  })
  @Matches(NAME_VALIDATOR, {
    message: 'The name must contain only letters and spaces',
    groups: ['validate'],
  })
  @IsNotEmpty({
    message: 'The name must not be empty',
    groups: ['validate'],
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '), {
    groups: ['transform'],
  })
  @Transform(({ value }) => value.trim(), {
    groups: ['transform'],
  })
  @IsString({
    message: 'The name must be a string',
    groups: ['validate'],
  })
  readonly name: string;

  @ApiProperty({
    type: 'String',
    description: 'The last name of the user',
    example: 'Doe',
  })
  @Matches(NAME_VALIDATOR, {
    message: 'The last name must contain only letters and spaces',
    groups: ['validate'],
  })
  @IsNotEmpty({
    message: 'The last name must not be empty',
    groups: ['validate'],
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '), {
    groups: ['transform'],
  })
  @Transform(({ value }) => value.trim(), {
    groups: ['transform'],
  })
  @IsString({
    message: 'The last name must be a string',
    groups: ['validate'],
  })
  readonly lastName: string;

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
    example: 'Ababd123',
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

  @ApiProperty({
    type: 'String',
    enum: Role,
    description: 'The role of the user',
    example: 'ADMIN',
  })
  @IsNotEmpty({
    message: 'The role must not be empty',
    groups: ['validate'],
  })
  @Transform(({ value }) => value.replace(/\s+/g, ' '), {
    groups: ['transform'],
  })
  @Transform(({ value }) => value.trim(), {
    groups: ['transform'],
  })
  @IsString({
    message: 'The role must be a string',
    groups: ['validate'],
  })
  readonly role: Role;
}

export default CreateUserDto;
