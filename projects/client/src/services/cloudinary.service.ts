import axios from 'axios';

const uploadImage = async (imageFormData: FormData): Promise<any> => {
  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/dtywqmn9a/image/upload', imageFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        api_key: '627656454763436',
        api_secret: '_ETJ5Oj_Jm0S6BIpRh5fpHp8QJc',
        upload_preset: 'bmuxr2rx',
      },
    });
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default uploadImage;
