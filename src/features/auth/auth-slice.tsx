import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RefreshResponseData, api } from '@/app/services/api';
import { getTokenFromSessionStorage, setTokenInSessionStorage } from '@/utils/tokens';

interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
}

const accessToken = getTokenFromSessionStorage('access_token');
const refreshToken = getTokenFromSessionStorage('refresh_token');

const initialState: AuthState = {
  access_token: accessToken,
  refresh_token: refreshToken,
};

export const setTokens = createAsyncThunk(
  'auth/setTokens',
  async function (tokens: RefreshResponseData) {
    setTokenInSessionStorage(tokens.access_token, 'access_token');
    setTokenInSessionStorage(tokens.refresh_token, 'refresh_token');
    return tokens;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setTokens.fulfilled, (state, { payload }) => {
      state.access_token = payload.access_token;
      state.refresh_token = payload.refresh_token;
    });
    builder.addMatcher(api.endpoints.signin.matchFulfilled, (state, { payload }) => {
      state.access_token = payload.access_token;
      state.refresh_token = payload.refresh_token;
    });
  },
});

export default authSlice.reducer;
