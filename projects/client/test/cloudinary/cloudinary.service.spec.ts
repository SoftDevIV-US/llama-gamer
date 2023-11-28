import axios from 'axios';

import uploadImage from '@/services/cloudinary.service';

jest.mock('axios');

describe('uploadImage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should upload image successfully', async () => {
    const formData = new FormData();
    formData.append('file', new Blob());

    const response = { data: { url: 'https://example.com/image.png' } };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(response);

    const result = await uploadImage(formData);

    expect(axios.post).toHaveBeenCalledWith('https://api.cloudinary.com/v1_1/dtywqmn9a/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        api_key: '627656454763436',
        api_secret: '_ETJ5Oj_Jm0S6BIpRh5fpHp8QJc',
        upload_preset: 'bmuxr2rx',
      },
    });
    expect(result).toEqual(response);
  });

  it('should throw an error when the upload fails', async () => {
    const formData = new FormData();
    formData.append('file', new Blob());

    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(new Error('Error uploading image'));

    await expect(uploadImage(formData)).rejects.toThrow('Error uploading image');
  });
});
