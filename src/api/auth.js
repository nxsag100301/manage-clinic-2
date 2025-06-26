import axios from '../utils/authorizeAxios';

export const refreshTokenAPI = async refreshToken => {
  const response = await axios.post('/api/refresh-token', {
    RefreshToken: refreshToken,
  });
  return response.data;
};
