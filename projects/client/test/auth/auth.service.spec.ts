import axios from 'axios';

import sendLoginRequest from '@/services/auth.service';

jest.mock('axios');

describe('sendLoginRequest', () => {
  it('should send a login request and return the response data', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const responseData = { token: 'abc123', userId: '123' };

    const mockAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;

    mockAxiosPost.mockResolvedValueOnce({ data: responseData });

    const result = await sendLoginRequest(email, password);

    expect(mockAxiosPost).toHaveBeenCalledWith('/api/auth/login', { email, password });
    expect(result).toEqual(responseData);
  });
});
