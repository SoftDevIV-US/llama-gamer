import axios from 'axios';

import {
  createSupplier,
  deleteSupplierById,
  getAllSuppliers,
  getSupplierById,
  updateSupplierById,
} from '@/services/supplier.service';

jest.mock('axios');

describe('SupplierService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createSupplier', () => {
    it('should create a new supplier', async () => {
      const data = { email: 'testSupplier@gmail.com', deliveryTime: 5, countryId: '1234bo' };
      const response = { data: { id: '1', ...data } };
      (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(response);

      const result = await createSupplier(data);

      expect(axios.post).toHaveBeenCalledWith('/api/suppliers', data);
      expect(result).toEqual(response.data);
    });
  });
  describe('getAllSuppliers', () => {
    it('should get all suppliers', async () => {
      const response = { data: [{ email: 'testSupplier@gmail.com', deliveryTime: 5, countryId: '1234bo' }] };
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(response);

      const result = await getAllSuppliers();

      expect(axios.get).toHaveBeenCalledWith('/api/suppliers');
      expect(result).toEqual(response.data);
    });
  });

  describe('getSupplierById', () => {
    it('should get a supplier by id', async () => {
      const id = '1';
      const response = { data: { id, email: 'testSupplier@gmail.com', deliveryTime: 5, countryId: '1234bo' } };
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(response);

      const result = await getSupplierById(id);

      expect(axios.get).toHaveBeenCalledWith(`/api/suppliers/${id}`);
      expect(result).toEqual(response.data);
    });
  });

  describe('updateSupplierById', () => {
    it('should update a supplier by id', async () => {
      const id = '1';
      const data = { email: 'testUpdatedSupplier@gmail.com', deliveryTime: 5, countryId: '1234bo' };
      const response = { data: { id, ...data } };
      (axios.patch as jest.MockedFunction<typeof axios.patch>).mockResolvedValueOnce(response);

      const result = await updateSupplierById(id, data);

      expect(axios.patch).toHaveBeenCalledWith(`/api/suppliers/${id}`, data);
      expect(result).toEqual(response.data);
    });
  });

  describe('deleteSupplierById', () => {
    it('should delete a supplier by id', async () => {
      const id = '1';
      const response = { data: { id, email: 'testSupplier@gmail.com', deliveryTime: 5, countryId: '1234bo' } };
      (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValueOnce(response);

      const result = await deleteSupplierById(id);

      expect(axios.delete).toHaveBeenCalledWith(`/api/suppliers/${id}`);
      expect(result).toEqual(response.data);
    });
  });
});
