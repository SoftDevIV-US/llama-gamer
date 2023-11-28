import axios from 'axios';

import { CLOUDINARY_CONFIG, CLOUDINARY_URL } from '@/config/config';

const uploadImage = async (imageFormData: FormData): Promise<any> => {
  try {
    const response = await axios.post(`${CLOUDINARY_URL.url}upload`, imageFormData, CLOUDINARY_CONFIG);
    return response;
  } catch (error: any) {
    throw new Error(`Error uploading image: ${error.message}`);
  }
};

export default uploadImage;
