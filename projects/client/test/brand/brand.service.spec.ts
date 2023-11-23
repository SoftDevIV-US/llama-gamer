import axios from 'axios';

import { createBrand, deleteBrandById, getAllBrands, getBrandById, updateBrandById } from '@/services/brand.service';

jest.mock('axios');
jest.mock('@/store/auth.store', () => ({
  getState: jest.fn(() => ({
    auth: {
      token: 'mocked-auth-token',
    },
  })),
}));

describe('BrandService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createBrand', () => {
    it('should create a new brand', async () => {
      const data = {
        name: 'Test Brand',
        logo: 'https://example.com/logo.png',
      };
      const response = { data: { id: '1', ...data } };

      // Mock axios post method
      (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(response);

      const result = await createBrand(data);

      expect(axios.post).toHaveBeenCalledWith('/api/brands', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mocked-auth-token',
        },
      });
      expect(result).toEqual(response.data);
    });
  });

  describe('getAllBrands', () => {
    it('should get all brands', async () => {
      const response = { data: [{ id: '1', name: 'Test Brand' }] };
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(response);

      const result = await getAllBrands();

      expect(axios.get).toHaveBeenCalledWith('/api/brands', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mocked-auth-token',
        },
      });
      expect(result).toEqual(response.data);
    });
  });

  describe('getBrandById', () => {
    it('should get a brand by id', async () => {
      const id = '1';
      const response = { data: { id, name: 'Test Brand' } };
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(response);

      const result = await getBrandById(id);

      expect(axios.get).toHaveBeenCalledWith(`/api/brands/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mocked-auth-token',
        },
      });
      expect(result).toEqual(response.data);
    });
  });

  describe('updateBrandById', () => {
    it('should update a brand by id', async () => {
      const id = '1';
      const data = { name: 'Updated Test Brand' };
      const response = { data: { id, ...data } };
      (axios.patch as jest.MockedFunction<typeof axios.patch>).mockResolvedValueOnce(response);

      const result = await updateBrandById(id, data);

      expect(axios.patch).toHaveBeenCalledWith(`/api/brands/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mocked-auth-token',
        },
      });
      expect(result).toEqual(response.data);
    });
  });

  describe('deleteBrandById', () => {
    it('should delete a brand by id', async () => {
      const id = '1';
      const response = { data: { id, name: 'Test Brand' } };
      (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValueOnce(response);

      const result = await deleteBrandById(id);

      expect(axios.delete).toHaveBeenCalledWith(`/api/brands/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mocked-auth-token',
        },
      });
      expect(result).toEqual(response.data);
    });
  });
});
