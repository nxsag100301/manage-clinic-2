import axios from '../utils/authorizeAxios';

export const getStatisticalData = async data => {
  const response = await axios.post(
    '/HeThong/HT_BaoCaoBGD/api/bao-cao-BGD',
    data,
  );
  return response.data;
};
