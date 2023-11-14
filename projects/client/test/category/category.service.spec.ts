import axios from 'axios';

import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from '@/services/category.service';

jest.mock('axios');

describe('CountryService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const data = {
        name: 'Test Category',
        image: 'https://www.digitaloutlet.com.uy/imgs/productos/productos31_15439.png',
      };
      const response = { data: { id: '1', ...data } };
      (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(response);

      const result = await createCategory(data);

      expect(axios.post).toHaveBeenCalledWith('/api/categories', data);
      expect(result).toEqual(response.data);
    });
  });

  describe('getAllCategories', () => {
    it('should get all categories', async () => {
      const response = { data: [{ id: '1', name: 'Test Category' }] };
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(response);

      const result = await getAllCategories();

      expect(axios.get).toHaveBeenCalledWith('/api/categories');
      expect(result).toEqual(response.data);
    });
  });

  describe('getCategoryById', () => {
    it('should get a category by id', async () => {
      const id = '1';
      const response = { data: { id, name: 'Test Category' } };
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(response);

      const result = await getCategoryById(id);

      expect(axios.get).toHaveBeenCalledWith(`/api/categories/${id}`);
      expect(result).toEqual(response.data);
    });
  });

  describe('updateCategoryById', () => {
    it('should update a category by id', async () => {
      const id = '1';
      const data = { name: 'Updated Test Category' };
      const response = { data: { id, ...data } };
      (axios.patch as jest.MockedFunction<typeof axios.patch>).mockResolvedValueOnce(response);

      const result = await updateCategoryById(id, data);

      expect(axios.patch).toHaveBeenCalledWith(`/api/categories/${id}`, data);
      expect(result).toEqual(response.data);
    });
  });

  describe('deleteCategoryById', () => {
    it('should delete a category by id', async () => {
      const id = '1';
      const response = { data: { id, name: 'Test Category' } };
      (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValueOnce(response);

      const result = await deleteCategoryById(id);

      expect(axios.delete).toHaveBeenCalledWith(`/api/categories/${id}`);
      expect(result).toEqual(response.data);
    });
  });
});
