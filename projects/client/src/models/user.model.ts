import Penalty from './penalty.model';
import Purchase from './purchase.model';
import UsersProducts from './users-products.model';
import WishList from './wish-list.model';

interface User extends ApiRecord {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  penalty: Penalty;
  wishList: WishList;
  purchases: Purchase[];
  userProducts: UsersProducts[];
}

export default User;
