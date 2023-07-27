import { useMemo } from 'react';

import { selectIsAuthenticated, selectUser } from '@/features/auth/auth.slice';
import { useTypedSelector } from '@/hooks/use-typed-selector';

export function useAuth() {
  const user = useTypedSelector(selectUser);
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);

  return useMemo(() => ({ user, isAuthenticated }), [user, isAuthenticated]);
}
