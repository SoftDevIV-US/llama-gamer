import { Penalty, Purchase, Role, UsersProducts, WishList } from '@prisma/client';

class User {
  readonly id: string;

  readonly name: string;

  readonly lastName: string;

  readonly email: string;

  readonly password: string;

  readonly role: Role;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly penalty: Penalty;

  readonly wishList: WishList;

  readonly purchases: Purchase[];

  readonly usersProducts: UsersProducts[];
}

export default User;
