import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '@/app/store';
import { setTokens } from '@/features/auth/auth-slice';
import { HttpStatus } from '@/utils/http-status';
import { setTokenInSessionStorage } from '@/utils/tokens';

export interface SigninRequestBody {
  email: string;
  password: string;
}

interface SigninResponseData {
  access_token: string;
  refresh_token: string;
}

interface RefreshRequestBody {
  refreshToken: string;
}

export interface RefreshResponseData {
  access_token: string;
  refresh_token: string;
}

const baseUrl = process.env.API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.access_token;

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async function (args, api, extraOptions) {
  const { getState, dispatch } = api;

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === HttpStatus.UNAUTHORIZED) {
    try {
      const refreshToken = (getState() as RootState).auth.refresh_token;

      if (refreshToken !== null) {
        const refreshArgs: Omit<FetchArgs, 'body'> & { body: RefreshRequestBody } = {
          url: 'auth/refresh-token',
          method: 'POST',
          body: { refreshToken },
        };
        const refreshResponse = await baseQuery(refreshArgs, api, extraOptions);

        if (refreshResponse.data) {
          // TODO: get rid of "as"
          await dispatch(setTokens(refreshResponse.data as RefreshResponseData));
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.error('Error refreshing token: No refresh response data');
        }
      } else {
        console.error(`Error refreshing token: Couldn't get refresh_token from the state`);
      }
    } catch (error) {
      console.error(`Error refreshing token: ${error}`);
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signin: builder.mutation<SigninResponseData, SigninRequestBody>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setTokenInSessionStorage(data.access_token, 'access_token');
          setTokenInSessionStorage(data.refresh_token, 'refresh_token');
        } catch (error) {
          console.error(`Error setting tokens to session storage: ${error}`);
        }
      },
    }),
  }),
});

export const { useSigninMutation } = api;
