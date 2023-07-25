import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { axiosInstance } from '@/app/axios-instance';
import { RootState } from '@/app/store';
import {
  getTokenFromSessionStorage,
  removeTokenFromSessionStorage,
  setTokenInSessionStorage,
} from '@/utils/tokens';

export interface SigninRequestBody {
  email: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
}

const accessToken = getTokenFromSessionStorage('access_token');

export const signin = createAsyncThunk(
  'auth/signin',
  async ({ email, password }: SigninRequestBody, thunkAPI) => {
    try {
      const response = await axiosInstance.post('auth/login', { email, password });

      setTokenInSessionStorage(response.data.access_token, 'access_token');
      setTokenInSessionStorage(response.data.refresh_token, 'refresh_token');

      return;
    } catch (error) {
      // TODO: handle error
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const signout = createAsyncThunk('auth/signout', () => {
  removeTokenFromSessionStorage('access_token');
  removeTokenFromSessionStorage('refresh_token');
});

const initialState: AuthState = {
  isAuthenticated: accessToken ? true : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(signin.rejected, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(signout.fulfilled, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const selectIsAuthenticated = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.isAuthenticated,
);

export default authSlice.reducer;
