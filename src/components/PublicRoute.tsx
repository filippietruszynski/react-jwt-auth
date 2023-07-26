import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { selectIsAuthenticated } from '@/features/auth/auth.slice';
import { useTypedSelector } from '@/hooks/use-typed-selector';
import { Path } from '@/utils/path.enum';

interface PublicRouteProps extends PropsWithChildren {
  restricted?: boolean;
}

function PublicRoute({ restricted = false, children }: PublicRouteProps) {
  const location = useLocation();
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);

  if (isAuthenticated && restricted) {
    return <Navigate to={Path.PRIVATE} state={{ from: location }} replace />;
  }

  return children;
}

export default PublicRoute;
