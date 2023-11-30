import { Brand } from './brand.model';
import { Category } from './category.model';
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
  category: Category;
  brand: Brand;
  productImages: ProductImage[];
  productsSuppliers: OnlySuppliers[];
  wishListsProducts: WishListsProducts[];
  usersProducts: UsersProducts[];
  purchasesProducts: PurchasesProducts[];
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
  brandId: string;
  countryId: string;
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
  Category,
  CreateBrandDto,
  CreateCategoryDto,
  CreateProductDto,
  PrismaCategoryProduct,
  Product,
  UpdateBrandDto,
  UpdateCategoryDto,
  UpdateProductDto,
};
