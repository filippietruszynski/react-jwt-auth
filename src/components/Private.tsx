import { MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUser, signout } from '@/features/auth/auth.slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Path } from '@/utils/path.enum';

function Private() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentUser = useCurrentUser();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, currentUser]);

  async function handleSignout(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    await dispatch(signout());
    navigate(Path.HOME);
  }

  return (
    <>
      <h1>Private</h1>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      <button onClick={handleSignout}>Sign out</button>
    </>
  );
}

export default Private;
