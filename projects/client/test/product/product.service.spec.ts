import instance from '@/config/axios.config';
import { CreateProductDto } from '@/models/product.model';
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from '@/services/product.service';

jest.mock('@/config/axios.config');

describe('Product Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a product', async () => {
    const mockData: CreateProductDto = {
      name: 'Test Product',
      description: 'Product description',
      stock: 10,
      price: 20,
      isAvailable: true,
      brandId: '1',
      categoryId: '123',
      supplierIds: [],
      productImages: [],
    };

    const mockResponse = {
      id: '1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T12:00:00.000Z',
      name: 'Test Product',
      description: 'Product description',
      stock: 10,
      price: 20,
      isAvailable: true,
      brandId: '1',
      categoryId: '123',
      supplierIds: [],
      productImages: [],
    };

    (instance.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await createProduct(mockData);

    expect(instance.post).toHaveBeenCalledWith('/product', mockData);
    expect(result).toEqual(mockResponse);
  });

  it('should get all products', async () => {
    const mockResponse = {
      data: [
        {
          id: '1',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T12:00:00.000Z',
          name: 'Test Product 1',
        },
        {
          id: '2',
          createdAt: '2023-01-02T00:00:00.000Z',
          updatedAt: '2023-01-02T12:00:00.000Z',
          name: 'Test Product 2',
        },
      ],
    };

    (instance.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await getAllProducts();

    expect(instance.get).toHaveBeenCalledWith('/product');
    expect(result).toEqual(mockResponse.data);
  });

  it('should get a product by ID', async () => {
    const productId = '1';

    const mockResponse = {
      data: {
        id: '1',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T12:00:00.000Z',
        name: 'Test Product',
      },
    };

    (instance.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await getProductById(productId);

    expect(instance.get).toHaveBeenCalledWith(`/product/${productId}`);
    expect(result).toEqual(mockResponse.data);
  });

  it('should update a product by ID', async () => {
    const productId = '1';
    const mockData = {
      name: 'Updated Product',
      description: 'Updated Description',
      stock: 20,
      price: 30,
      isAvailable: true,
      brandId: '2',
      countryId: '456',
    };

    const mockResponse = {
      data: {
        id: '1',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-02T12:00:00.000Z',
        name: 'Updated Product',
      },
    };

    (instance.patch as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await updateProductById(productId, mockData);

    expect(instance.patch).toHaveBeenCalledWith(`/product/${productId}`, mockData);
    expect(result).toEqual(mockResponse);
  });

  it('should delete a product by ID', async () => {
    const productId = '1';

    const mockResponse = {
      data: {
        id: '1',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T12:00:00.000Z',
        name: 'Test Product',
      },
    };

    (instance.delete as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await deleteProductById(productId);

    expect(instance.delete).toHaveBeenCalledWith(`/product/${productId}`);
    expect(result).toEqual(mockResponse);
  });
});
