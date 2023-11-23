import ProductImage from './product-images.model';
import ProductsSuppliers from './products-suppliers.model';
import PurchasesProducts from './purchases-products.model';
import UsersProducts from './users-products.model';
import WishListsProducts from './wish-lists-products.model';

interface Product extends ApiRecord {
  name: string;
  description: string;
  stock: number;
  price: number;
  isAvailable: boolean;
  categoryId: string;
  brandId: string;
  productImages: ProductImage[];
  productsSuppliers: ProductsSuppliers[];
  wishListsProducts: WishListsProducts[];
  usersProducts: UsersProducts[];
  purchasesProducts: PurchasesProducts[];
}

export default Product;
