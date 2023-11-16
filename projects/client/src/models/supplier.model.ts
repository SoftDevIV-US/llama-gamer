interface Supplier extends ApiRecord {
  email: string;
  deliveryTime: number;
  country: string;
}

type CreateSupplierDto = {
  email: string;
  deliveryTime: number;
  country: string;
};

type UpdateSupplierDto = {
  email?: string;
  deliveryTime?: number;
  country?: string;
};

export type { CreateSupplierDto, Supplier, UpdateSupplierDto };
