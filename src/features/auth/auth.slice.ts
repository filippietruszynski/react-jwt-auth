import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';
import AuthService, { SigninRequestData } from '@/features/auth/auth.service';
import {
  getTokenFromSessionStorage,
  removeTokenFromSessionStorage,
  setTokenInSessionStorage,
} from '@/utils/tokens';

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
  async (requestData: SigninRequestData, thunkAPI) => {
    try {
      const response = await AuthService.signin(requestData);

      setTokenInSessionStorage(response.data.access_token, 'access_token');
      setTokenInSessionStorage(response.data.refresh_token, 'refresh_token');

      thunkAPI.dispatch(getUser());

      return;
    } catch (error) {
      // TODO: handle error
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    const response = await AuthService.getUser();
    return response.data;
  } catch (error) {
    // TODO: handle error
    return thunkAPI.rejectWithValue(error);
  }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
  try {
    const refresh_token = getTokenFromSessionStorage('refresh_token');

    if (!refresh_token) {
      return thunkAPI.rejectWithValue('Error refreshing token: No refresh token found');
    }

    const response = await AuthService.refreshToken({
      refreshToken: refresh_token,
    });

    setTokenInSessionStorage(response.data.access_token, 'access_token');
    setTokenInSessionStorage(response.data.refresh_token, 'refresh_token');

    thunkAPI.dispatch(getUser());

    return;
  } catch (error) {
    thunkAPI.dispatch(signout());
    // TODO: handle error
    return thunkAPI.rejectWithValue(error);
  }
});

export const signout = createAsyncThunk('auth/signout', () => {
  removeTokenFromSessionStorage('access_token');
  removeTokenFromSessionStorage('refresh_token');
  return;
});

const access_token = getTokenFromSessionStorage('access_token');
const refresh_token = getTokenFromSessionStorage('refresh_token');

const initialState: AuthState = { user: null, isAuthenticated: !!access_token && !!refresh_token };

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
      .addCase(getUser.fulfilled, (state, action) => {
        delete action.payload.password;
        state.user = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(signout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const selectCurrentUser = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.user,
);

export const selectIsAuthenticated = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.isAuthenticated,
);

export default authSlice.reducer;
