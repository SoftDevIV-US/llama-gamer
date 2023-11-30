import instance from '@/config/axios.config';
import { Brand, CreateBrandDto, UpdateBrandDto } from '@/models/product.model';
import { createBrand, deleteBrandById, getAllBrands, getBrandById, updateBrandById } from '@/services/brand.service';

jest.mock('@/config/axios.config');

describe('Brand Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a brand', async () => {
    const mockData: CreateBrandDto = {
      name: 'Test Brand',
      logo: 'test-logo.png',
    };

    const mockResponse: Brand = {
      id: '1',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
      name: 'Test Brand',
      logo: 'test-logo.png',
      products: [],
    };

    (instance.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await createBrand(mockData);

    expect(instance.post).toHaveBeenCalledWith('/brands', mockData);
    expect(result).toEqual(mockResponse);
  });

  it('should get all brands', async () => {
    const mockResponse: Brand[] = [
      {
        id: '1',
        createdAt: '2022-01-01',
        updatedAt: '2022-01-01',
        name: 'Brand 1',
        logo: 'logo1.png',
        products: [],
      },
      {
        id: '2',
        createdAt: '2022-01-02',
        updatedAt: '2022-01-02',
        name: 'Brand 2',
        logo: 'logo2.png',
        products: [],
      },
    ];

    (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await getAllBrands();

    expect(instance.get).toHaveBeenCalledWith('/brands');
    expect(result).toEqual(mockResponse);
  });

  it('should get a brand by ID', async () => {
    const brandId = '1';

    const mockResponse: Brand = {
      id: '1',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
      name: 'Test Brand',
      logo: 'test-logo.png',
      products: [],
    };

    (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await getBrandById(brandId);

    expect(instance.get).toHaveBeenCalledWith(`/brands/${brandId}`);
    expect(result).toEqual(mockResponse);
  });

  it('should update a brand by ID', async () => {
    const brandId = '1';
    const mockData: UpdateBrandDto = {
      name: 'Updated Brand',
    };

    const mockResponse: Brand = {
      id: '1',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-02',
      name: 'Updated Brand',
      logo: 'test-logo.png',
      products: [],
    };

    (instance.patch as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await updateBrandById(brandId, mockData);

    expect(instance.patch).toHaveBeenCalledWith(`/brands/${brandId}`, mockData);
    expect(result).toEqual(mockResponse);
  });

  it('should delete a brand by ID', async () => {
    const brandId = '1';

    const mockResponse: Brand = {
      id: '1',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
      name: 'Test Brand',
      logo: 'test-logo.png',
      products: [],
    };

    (instance.delete as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await deleteBrandById(brandId);

    expect(instance.delete).toHaveBeenCalledWith(`/brands/${brandId}`);
    expect(result).toEqual(mockResponse);
  });
});
