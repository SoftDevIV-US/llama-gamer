import WishListsProducts from './wish-lists-products.model';

interface WishList extends ApiRecord {
  title: string;
  description: string;
  userId: string;
  whishListProducts: WishListsProducts[];
}

export default WishList;
