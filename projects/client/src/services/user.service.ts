import instance from '@/config/axios.config';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '@/models/product.model';

export const createCategory = async (data: CreateCategoryDto): Promise<Category> => {
  const response = await instance.post('/categories', data);
  return response.data;
};

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await instance.get('/categories');
  return response.data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await instance.get(`/categories/${id}`);
  return response.data;
};

export const updateCategoryById = async (id: string, data: UpdateCategoryDto): Promise<Category> => {
  const response = await instance.patch(`/categories/${id}`, data);
  return response.data;
};

export const deleteCategoryById = async (id: string): Promise<Category> => {
  const response = await instance.delete(`/categories/${id}`);
  return response.data;
};
