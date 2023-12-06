import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Form as FormFormik, Formik, FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import Button from '@/app/components/button/Button';
import Form from '@/app/components/form/Form';
import ImageField from '@/app/components/image-field/ImageField';
import InputField from '@/app/components/input-field/InputField';
import InputFieldDropdown from '@/app/components/input-field-drop-down/InputFieldDropDown';
import InputFieldDropdownMultiSelect from '@/app/components/input-field-drop-down-multi-select/InputFieldDropdownMultiSelect';
import InnerLayout from '@/app/layouts/InnerLayout';
import { Brand, Category, CreateProductDto } from '@/models/product.model';
import ProductImage from '@/models/product-images.model';
import { Supplier } from '@/models/supplier.model';
import { getAllBrands } from '@/services/brand.service';
import { getAllCategories } from '@/services/category.service';
import uploadImage from '@/services/cloudinary.service';
import { getAllSuppliers } from '@/services/supplier.service';

import useAddProduct from './hooks/useAddProduct';

type DropdownOptionCategory = { id: string; name: string } | Category;
type DropdownOptionBrand = { id: string; name: string } | Brand;
type DropdownOptionSupplier = { id: string; name: string } | Supplier;

function AddProduct() {
  const [isNameCorrect, setIsNameCorrect] = useState(true);
  const [isDescriptionCorrect, setIsDescriptionCorrect] = useState(true);
  const [isStockCorrect, setIsStockCorrect] = useState(true);
  const [isPriceCorrect, setIsPriceCorrect] = useState(true);
  const [isAvailableCorrect, setIsAvailableCorrect] = useState(true);
  const [isCategoryCorrect, setIsCategoryCorrect] = useState(true);
  const [isBrandCorrect, setIsBrandCorrect] = useState(true);
  const [isSupplierCorrect, setIsSupplierCorrect] = useState(true);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [, setIsImageCorrect] = useState(true);
  const [imageFormData, setImageFormData] = useState<FormData | null>(null);
  const [, setIsLoading] = useState<boolean>(false);
  const selectedValues: string[] = [];

  const { addProduct } = useAddProduct({
    setIsNameCorrect,
    setIsDescriptionCorrect,
    setIsStockCorrect,
    setIsPriceCorrect,
    setIsAvailableCorrect,
    setIsCategoryCorrect,
    setIsBrandCorrect,
    setIsSupplierCorrect,
    setIsImageCorrect,
  });
  const [categoryList, setCategoryList] = useState<DropdownOptionCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategoryList([{ id: '', name: 'Select a category...' }, ...categories]);
      } catch (error) {
        throw new Error('Error while loading categories');
      }
    };

    fetchCategories();
  }, []);

  const [brandList, setBrandList] = useState<DropdownOptionBrand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await getAllBrands();
        setBrandList([{ id: '', name: 'Select a brand...' }, ...brands]);
      } catch (error) {
        throw new Error('Error while loading brands');
      }
    };

    fetchBrands();
  }, []);

  const [supplierList, setSupplierList] = useState<DropdownOptionSupplier[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const suppliers = await getAllSuppliers();

        const suppliersArray = Object.entries(suppliers).map(([, value]) => ({
          id: value.id,
          name: value.email,
        }));

        setSupplierList([{ id: '-1', name: 'Select the suppliers...' }, ...suppliersArray]);
      } catch (error) {
        throw new Error('Error while loading suppliers');
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <InnerLayout>
      <Form title='Product'>
        <Formik
          initialValues={{
            name: '',
            description: '',
            stock: 1,
            price: 1,
            isAvailable: true,
            categoryId: '',
            brandId: '',
            supplierId: [],
            productImages: [] as ProductImage[],
          }}
          onSubmit={async (values) => {
            if (!values.categoryId || values.categoryId === '') {
              setIsCategoryCorrect(false);
              toast.error('Please select a category from the list');
              return;
            }
            if (!values.brandId || values.brandId === '') {
              setIsBrandCorrect(false);
              toast.error('Please select a brand from the list');
              return;
            }
            if (selectedSuppliers.length === 0) {
              setIsSupplierCorrect(false);
              toast.error('Please select at least one supplier.');
              return;
            }
            if (imageFormData !== null) {
              setIsLoading(true);
              try {
                const response = await uploadImage(imageFormData);

                const imageUrl: string = response.data.secure_url;

                const newValues: CreateProductDto = {
                  name: values.name,
                  description: values.description,
                  stock: values.stock,
                  price: values.price,
                  isAvailable: values.isAvailable,
                  categoryId: values.categoryId,
                  brandId: values.brandId,
                  supplierIds: values.supplierId,
                  productImages: [imageUrl],
                };

                setIsNameCorrect(true);
                setIsDescriptionCorrect(true);
                setIsStockCorrect(true);
                setIsPriceCorrect(true);
                setIsAvailableCorrect(true);
                setIsCategoryCorrect(true);
                setIsBrandCorrect(true);
                setIsSupplierCorrect(true);
                setIsImageCorrect(true);
                addProduct(newValues);
              } catch (error: any) {
                setIsLoading(false);
                throw new Error(error);
              } finally {
                setIsLoading(false);
              }
            }
          }}
        >
          {(
            formikProps: FormikProps<{
              name: string;
              description: string;
              stock: number;
              price: number;
              isAvailable: boolean;
              categoryId: string;
              brandId: string;
              supplierId: [];
              productImages: ProductImage[];
            }>
          ) => (
            <FormFormik className='flex h-full flex-col overflow-y-scroll px-0 py-12 lg:px-16 landscape:gap-3 landscape:py-1 landscape:md:gap-6 landscape:md:py-8'>
              <div className='flex grow flex-col gap-10 font-normal lg:gap-8'>
                <InputField id='name' value='name' placeholder='Name of the product...' isCorrect={isNameCorrect}>
                  Name
                </InputField>

                <InputField
                  id='description'
                  value='description'
                  placeholder='Description of the product...'
                  isCorrect={isDescriptionCorrect}
                >
                  Description
                </InputField>

                <InputField
                  id='stock'
                  value='stock'
                  placeholder='Stock of the product...'
                  isCorrect={isStockCorrect}
                  type='number'
                  allowDecimals={false}
                >
                  Stock
                </InputField>

                <InputField
                  id='price'
                  value='price'
                  placeholder='Price of the product...    Bs'
                  isCorrect={isPriceCorrect}
                  type='number'
                >
                  Price
                </InputField>

                <InputFieldDropdown
                  id='select-availability'
                  name='Availability'
                  options={[
                    { id: 'true', name: 'Available' },
                    { id: 'false', name: 'Not Available' },
                  ]}
                  isCorrect={isAvailableCorrect}
                  onChange={(e) => {
                    formikProps.setFieldValue('isAvailable', e.target.value === 'true');
                    setIsAvailableCorrect(true);
                  }}
                >
                  Availability
                </InputFieldDropdown>

                <InputFieldDropdown
                  id='select-category'
                  name='Categories'
                  options={categoryList.map((option) => ({ id: option.id as string, name: option.name }))}
                  isCorrect={isCategoryCorrect}
                  onChange={(e) => {
                    formikProps.setFieldValue('categoryId', e.target.value);
                    setIsCategoryCorrect(true);
                  }}
                >
                  Category
                </InputFieldDropdown>

                <InputFieldDropdown
                  id='select-brand'
                  name='Brands'
                  options={brandList.map((option) => ({ id: option.id as string, name: option.name }))}
                  isCorrect={isBrandCorrect}
                  onChange={(e) => {
                    formikProps.setFieldValue('brandId', e.target.value);
                    setIsBrandCorrect(true);
                  }}
                >
                  Brand
                </InputFieldDropdown>

                <InputFieldDropdownMultiSelect
                  id='select-suppliers'
                  name='Suppliers'
                  options={supplierList.map((option) => ({ id: option.id as string, name: option.name }))}
                  isCorrect={isSupplierCorrect}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    formikProps.handleChange(e);
                    selectedValues.push(e.target.value);
                    formikProps.setFieldValue('supplierId', selectedValues);
                    setIsSupplierCorrect(selectedValues.length > 0);
                    setSelectedSuppliers(selectedValues);
                  }}
                >
                  Suppliers
                </InputFieldDropdownMultiSelect>

                <ImageField
                  id='image'
                  value='image'
                  size='medium'
                  onFormDataChange={(formData) => setImageFormData(formData)}
                >
                  Image
                </ImageField>
              </div>
              <div className='flex justify-center py-2'>
                <Button className='flex place-items-center gap-2 rounded-xl bg-[#223343] px-6 py-2 text-white' isSubmit>
                  <AddCircleOutlineIcon />
                  <p className='text-xl'>Add</p>
                </Button>
              </div>
            </FormFormik>
          )}
        </Formik>
      </Form>
    </InnerLayout>
  );
}

export default AddProduct;
