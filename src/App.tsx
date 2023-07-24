import { Route, Routes, useNavigate } from 'react-router-dom';

import PrivateRoute from '@/components/PrivateRoute';
import PublicRoute from '@/components/PublicRoute';
import Signin from '@/features/auth/Signin';
import { Path } from '@/utils/path.enum';

function App() {
  const navigate = useNavigate();
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
              Signin
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
            <button
              onClick={() => {
                navigate(Path.SIGNIN);
              }}
            >
              Signin
            </button>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
