import { Role } from '@prisma/client';

class UpdateUserDto {
  readonly name?: string;

  readonly lastName?: string;

  readonly email?: string;

  readonly password?: string;

  readonly role?: Role;
}

export default UpdateUserDto;
