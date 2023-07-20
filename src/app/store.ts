import { configureStore } from '@reduxjs/toolkit';

import { api } from '@/app/services/api';
import authReducer from '@/features/auth/auth-slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
