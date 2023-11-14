interface Brand extends ApiRecord {
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

export type { Brand, CreateBrandDto, UpdateBrandDto };
