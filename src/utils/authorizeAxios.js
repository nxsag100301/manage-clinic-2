import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logOut } from '../redux/slice/userSlice';
import { refreshTokenAPI } from '../api/auth';

let axiosReduxStore;
export const injectStore = mainStore => {
  axiosReduxStore = mainStore;
};

let authorizeAxiosInstance = axios.create({
  baseURL: 'https://mobile.sixossoft.com',
});

authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10;
authorizeAxiosInstance.defaults.withCredentials = true;

// Interceptors Request
authorizeAxiosInstance.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

let refreshTokenPromise = null;

// Interceptors Response
authorizeAxiosInstance.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // Token không hợp lệ, refreshtoken hết hạn
    // if (error.response?.status === 401) {
    //   axiosReduxStore.dispatch(logOut());
    // }
    // Lấy các api bị lỗi do accesstoken hết hạn statusCode = 410
    // Dự án này backend trả lỗi 401 dù accesstoken ko hợp lệ hay hết hạn
    const originalRequests = error.config;
    if (error.response?.status === 401 && !originalRequests._retry) {
      originalRequests._retry = true;
      if (!refreshTokenPromise) {
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        refreshTokenPromise = refreshTokenAPI(refreshToken)
          .then(data => {
            return data?.accessToken;
          })
          .catch(_error => {
            axiosReduxStore.dispatch(logOut());
            return Promise.reject(_error);
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      return refreshTokenPromise.then(async accessToken => {
        // Bước 1: Nếu dự án cần lưu accessToken vào localStorage hoặc nơi khác thì xử lý ở đây
        await AsyncStorage.setItem('access_token', accessToken);
        // Bước 2: Return lại axios instance kết hợp các originalRequests để gọi lại những api bị lỗi hết hạn accessToken
        return authorizeAxiosInstance(originalRequests);
      });
    }

    let errMessage = error?.message;
    if (error.response?.data?.message) {
      errMessage = error.response?.data?.message;
    }
    if (error.response?.status !== 410) {
      console.log('errMessage from interceptor: ', errMessage);
    }
    return Promise.reject(error);
  },
);

export default authorizeAxiosInstance;
