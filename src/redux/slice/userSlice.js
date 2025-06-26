import axios from '../../utils/authorizeAxios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  currentUser: null,
};

export const userLoginAPI = createAsyncThunk(
  'user/userLoginAPI',
  async data => {
    const res = await axios.post('/api/loginmobie', data);
    const { access_token, refresh_token } = res.data;
    await AsyncStorage.setItem('access_token', access_token);
    await AsyncStorage.setItem('refresh_token', refresh_token);
    return res.data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: state => {
      state.currentUser = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(userLoginAPI.fulfilled, (state, action) => {
      state.currentUser = jwtDecode(action.payload.access_token);
    });
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
