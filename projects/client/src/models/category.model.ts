interface Category extends ApiRecord {
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

export type { Category, CreateCategoryDto, UpdateCategoryDto };
