import { ApiProperty } from '@nestjs/swagger';
import { Penalty, Purchase, Role, UsersProducts, WishList } from '@prisma/client';

class User {
  @ApiProperty({
    type: 'String',
    description: 'The id of the user',
    example: 'ckm9q7m4f0000kzr3y6z8z6xh',
  })
  readonly id: string;

  @ApiProperty({
    type: 'String',
    description: 'The name of the user',
    example: 'John',
  })
  readonly name: string;

  @ApiProperty({
    type: 'String',
    description: 'The last name of the user',
    example: 'Doe',
  })
  readonly lastName: string;

  @ApiProperty({
    type: 'String',
    description: 'The email of the user',
    example: 'john.doe@gmail.com',
  })
  readonly email: string;

  @ApiProperty({
    type: 'String',
    description: 'The password of the user',
    example: 'ABadf#123',
  })
  readonly password: string;

  @ApiProperty({
    type: 'String',
    enum: Role,
    description: 'The role of the user',
    example: 'ADMIN',
  })
  readonly role: Role;

  @ApiProperty({
    type: 'Date',
    description: 'The date when the user was created',
    example: '2021-02-01T00:00:00.000Z',
  })
  readonly createdAt: Date;

  @ApiProperty({
    type: 'Date',
    description: 'The date when the user was updated',
    example: '2021-02-01T00:00:00.000Z',
  })
  readonly updatedAt: Date;

  @ApiProperty({
    description: 'The penalty of the user',
  })
  readonly penalty: Penalty;

  @ApiProperty({
    description: 'The wish list of the user',
  })
  readonly wishList: WishList;

  @ApiProperty({
    isArray: true,
    description: 'The purchases of the user',
  })
  readonly purchases: Purchase[];

  @ApiProperty({
    isArray: true,
    description: 'The users products of the user',
  })
  readonly usersProducts: UsersProducts[];
}

export default User;
