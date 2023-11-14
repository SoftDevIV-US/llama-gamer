import axios from 'axios';

import { Category, CreateCategoryDto, UpdateCategoryDto } from '@/models/category.model';

export const createCategory = async (data: CreateCategoryDto): Promise<Category> => {
  const response = await axios.post('/api/categories', data);
  return response.data;
};

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await axios.get('/api/categories');
  return response.data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await axios.get(`/api/categories/${id}`);
  return response.data;
};

export const updateCategoryById = async (id: string, data: UpdateCategoryDto): Promise<Category> => {
  const response = await axios.patch(`/api/categories/${id}`, data);
  return response.data;
};

export const deleteCategoryById = async (id: string): Promise<Category> => {
  const response = await axios.delete(`/api/categories/${id}`);
  return response.data;
};
