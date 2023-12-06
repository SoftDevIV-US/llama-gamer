import ProductImage from './product-images.model';
import PurchasesProducts from './purchases-products.model';
import { Supplier } from './supplier.model';
import UsersProducts from './users-products.model';
import WishListsProducts from './wish-lists-products.model';

interface Brand extends ApiRecord {
  name: string;
  logo: string;
  products: PrismaCategoryProduct[];
}

interface PrismaBrand extends ApiRecord {
  name: string;
  logo: string;
}

type CreateBrandDto = {
  name: string;
  logo: string;
};

type UpdateBrandDto = {
  name?: string;
  logo?: string;
};

interface Category extends ApiRecord {
  name: string;
  image: string;
  products: PrismaProduct[];
}

interface PrismaCategory extends ApiRecord {
  name: string;
  image: string;
}

type CreateCategoryDto = {
  name: string;
  image: string;
};

type UpdateCategoryDto = {
  name?: string;
  image?: string;
};

interface OnlySuppliers {
  supplier: Supplier;
}

interface Product extends ApiRecord {
  name: string;
  description: string;
  stock: number;
  price: number;
  isAvailable: boolean;
  categoryId: string;
  brandId: string;
  category: PrismaCategory;
  brand: PrismaBrand;
  productImages: ProductImage[];
  productsSuppliers: OnlySuppliers[];
  wishListsProducts: WishListsProducts[];
  usersProducts: UsersProducts[];
  purchasesProducts: PurchasesProducts[];
}

interface CartProduct {
  product: Product;
  quantity: number;
  tax: number;
  deliveryTime: number;
  totalPrice: number;
  priceWithoutTax: number;
  supplier: Supplier | null;
}

interface PrismaProduct extends ApiRecord {
  name: string;
  description: string;
  stock: number;
  price: number;
  isAvailable: boolean;
  categoryId: string;
  brandId: string;
  productImages: ProductImage[];
}

interface PrismaCategoryProduct extends PrismaProduct {
  category: PrismaCategory;
}

type CreateProductDto = {
  name: string;
  description: string;
  stock: number;
  price: number;
  isAvailable: boolean;
  categoryId: string;
  brandId: string;
  supplierIds: string[];
  productImages: string[];
};

type UpdateProductDto = {
  name: string;
  description: string;
  stock: number;
  price: number;
  isAvailable: boolean;
  brandId: string;
  countryId: string;
};

export type {
  Brand,
  CartProduct,
  Category,
  CreateBrandDto,
  CreateCategoryDto,
  CreateProductDto,
  PrismaCategoryProduct,
  PrismaProduct,
  Product,
  UpdateBrandDto,
  UpdateCategoryDto,
  UpdateProductDto,
};
