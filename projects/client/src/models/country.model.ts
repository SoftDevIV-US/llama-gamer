interface Country extends ApiRecord {
  name: string;
  tax: number;
}

type CreateCountryDto = {
  name: string;
  tax: number;
};

type UpdateCountryDto = {
  name?: string;
  tax?: number;
};

export type { Country, CreateCountryDto, UpdateCountryDto };
