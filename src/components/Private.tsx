import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUser, signout } from '@/features/auth/auth.slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { Path } from '@/utils/path.enum';

function Private() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleSignout(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    await dispatch(signout());
    navigate(Path.HOME);
  }

  async function handleGetUser(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await dispatch(getUser());
  }

  return (
    <>
      <h1>Private</h1>
      <button onClick={handleSignout}>Sign out</button>
      <button onClick={handleGetUser}>Get user</button>
    </>
  );
}

export default Private;
