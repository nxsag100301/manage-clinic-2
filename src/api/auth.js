import axios from '../utils/authorizeAxios';

export const refreshTokenAPI = async refreshToken => {
  const response = await axios.post('/api/refresh-token', {
    RefreshToken: refreshToken,
  });
  return response.data;
};

export const getJson = async jsonFileName => {
  // DM_VaiTron.json, DM_Khu.json
  const response = await axios.get(`/dist/data/json/${jsonFileName}`);
  return response.data;
};
