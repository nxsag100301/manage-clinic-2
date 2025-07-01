import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logOut } from '../redux/slice/userSlice';
import { refreshTokenAPI } from '../api/auth';

let axiosReduxStore;
export const injectStore = mainStore => {
  axiosReduxStore = mainStore;
};

const authorizeAxiosInstanceChatGPT = axios.create({
  baseURL: 'https://mobile.sixossoft.com',
  timeout: 1000 * 60 * 10,
  withCredentials: true,
});

// === Request Interceptor === //
authorizeAxiosInstanceChatGPT.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// === Refresh Token Logic === //
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// === Response Interceptor === //
authorizeAxiosInstanceChatGPT.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Nếu token hết hạn
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Nếu đang refresh token thì đợi token mới
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return authorizeAxiosInstanceChatGPT(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      // Bắt đầu refresh token
      isRefreshing = true;

      const refreshToken = await AsyncStorage.getItem('refresh_token');

      return new Promise(async (resolve, reject) => {
        try {
          const data = await refreshTokenAPI(refreshToken);
          const newToken = data?.accessToken;

          // Lưu lại token mới
          await AsyncStorage.setItem('access_token', newToken);

          // Gán lại header mới
          authorizeAxiosInstanceChatGPT.defaults.headers.Authorization =
            'Bearer ' + newToken;
          originalRequest.headers.Authorization = 'Bearer ' + newToken;

          processQueue(null, newToken); // Retry các request cũ
          resolve(authorizeAxiosInstanceChatGPT(originalRequest));
        } catch (err) {
          processQueue(err, null);
          axiosReduxStore.dispatch(logOut());
          reject(err);
        } finally {
          isRefreshing = false;
        }
      });
    }

    // Nếu là lỗi khác
    let errMessage = error?.message;
    if (error.response?.data?.message) {
      errMessage = error.response.data.message;
    }
    if (error.response?.status !== 410) {
      console.log('errMessage from interceptor:', errMessage);
    }

    return Promise.reject(error);
  },
);

export default authorizeAxiosInstanceChatGPT;
