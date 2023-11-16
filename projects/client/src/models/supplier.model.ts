import { Country } from './country.model';

interface Supplier extends ApiRecord {
  email: string;
  deliveryTime: number;
  countryId: string;
  country: Country;
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
