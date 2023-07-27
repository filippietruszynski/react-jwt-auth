import { useEffect } from 'react';

import { getUser } from '@/features/auth/auth.slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAuth } from '@/hooks/use-auth';

function Header() {
  const dispatch = useAppDispatch();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.user && auth.isAuthenticated) {
      dispatch(getUser());
    }
  }, [dispatch, auth]);

  return (
    <header
      style={{
        height: '200px',
        borderBottom: '1px solid gray',
      }}
    >
      {auth.user ? <pre>{JSON.stringify(auth.user, null, 2)}</pre> : null}
    </header>
  );
}

export default Header;
