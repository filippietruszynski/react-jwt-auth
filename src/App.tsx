import { Navigate, Route, Routes } from 'react-router-dom';

import Header from '@/components/Header';
import Home from '@/components/Home';
import Private from '@/components/Private';
import PrivateRoute from '@/components/PrivateRoute';
import PublicRoute from '@/components/PublicRoute';
import Signin from '@/components/Signin';
import { Path } from '@/utils/path.enum';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* HOME PAGE */}
        <Route
          path={Path.HOME}
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        {/* SIGNIN PAGE */}
        <Route
          path={Path.SIGNIN}
          element={
            <PublicRoute restricted>
              <Signin />
            </PublicRoute>
          }
        />
        {/* PRIVATE PAGE */}
        <Route
          path={Path.PRIVATE}
          element={
            <PrivateRoute>
              <Private />
            </PrivateRoute>
          }
        />
        {/* CATCH ALL ROUTE */}
        <Route path="*" element={<Navigate to={Path.PRIVATE} />} />
      </Routes>
    </>
  );
}

export default App;
