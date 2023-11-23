import { Country } from './country.model';
import ProductsSuppliers from './products-suppliers.model';

interface Supplier extends ApiRecord {
  email: string;
  deliveryTime: number;
  countryId: string;
  country: Country;
  productsSuppliers: ProductsSuppliers[];
}

type CreateSupplierDto = {
  email: string;
  deliveryTime: number;
  countryId: string;
};

type UpdateSupplierDto = {
  email?: string;
  deliveryTime?: number;
  countryId?: string;
};

export type { CreateSupplierDto, Supplier, UpdateSupplierDto };
