import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Path } from '@/utils/path.enum';

function PrivateRoute({ children }: PropsWithChildren) {
  // TODO: Add selector
  const auth = false;
  const location = useLocation();

  if (!auth) {
    return <Navigate to={Path.SIGNIN} state={{ from: location }} replace />;
  }

  return children;
}
export default PrivateRoute;
