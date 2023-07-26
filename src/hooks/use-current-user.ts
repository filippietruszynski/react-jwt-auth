import { useMemo } from 'react';

import { selectCurrentUser } from '@/features/auth/auth.slice';
import { useTypedSelector } from '@/hooks/use-typed-selector';

export const useCurrentUser = () => {
  const user = useTypedSelector(selectCurrentUser);

  return useMemo(() => ({ user }), [user]);
};
