import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { axiosInstance } from '@/app/axios-instance';
import { RootState } from '@/app/store';
import {
  getTokenFromSessionStorage,
  removeTokenFromSessionStorage,
  setTokenInSessionStorage,
} from '@/utils/tokens';

export interface SigninRequest {
  email: string;
  password: string;
}

interface SigninResponse {
  access_token: string;
  refresh_token: string;
}

interface GetUserResponse {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const signin = createAsyncThunk(
  'auth/signin',
  async ({ email, password }: SigninRequest, thunkAPI) => {
    try {
      const response = await axiosInstance.post<SigninResponse>('auth/login', {
        email,
        password,
      });

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

export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get<GetUserResponse>('/auth/profile');
    return response.data;
  } catch (error) {
    // TODO: handle error
    return thunkAPI.rejectWithValue(error);
  }
});

const accessToken = getTokenFromSessionStorage('access_token');

const initialState: AuthState = { user: null, isAuthenticated: accessToken ? true : false };

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
      })
      .addCase(getUser.fulfilled, (state, action) => {
        delete action.payload.password;
        state.user = action.payload;
      });
  },
});

export const selectIsAuthenticated = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.isAuthenticated,
);

export default authSlice.reducer;
