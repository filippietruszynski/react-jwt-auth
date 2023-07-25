import { MouseEvent } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import PrivateRoute from '@/components/PrivateRoute';
import PublicRoute from '@/components/PublicRoute';
import Signin from '@/features/auth/Signin';
import { getUser, signout } from '@/features/auth/auth.slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { Path } from '@/utils/path.enum';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleGetUser(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await dispatch(getUser());
  }

  async function handleSignout(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await dispatch(signout());
    navigate(Path.HOME);
  }

  return (
    <Routes>
      <Route
        path={Path.HOME}
        element={
          <PublicRoute>
            <h1>Homepage</h1>
            <button
              onClick={() => {
                navigate(Path.SIGNIN);
              }}
            >
              Sign in
            </button>
          </PublicRoute>
        }
      />
      <Route
        path={Path.SIGNIN}
        element={
          <PublicRoute restricted>
            <Signin />
          </PublicRoute>
        }
      />
      <Route
        path={Path.PRIVATE}
        element={
          <PrivateRoute>
            <h1>Private</h1>
            <button onClick={handleGetUser}>Get user</button>
            <button onClick={handleSignout}>Sign out</button>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
