import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { selectIsAuthenticated } from '@/features/auth/auth.slice';
import { useTypedSelector } from '@/hooks/use-typed-selector';
import { Path } from '@/utils/path.enum';

function PrivateRoute({ children }: PropsWithChildren) {
  const location = useLocation();
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={Path.SIGNIN} state={{ from: location }} replace />;
  }

  return children;
}
export default PrivateRoute;
