import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Path } from '@/utils/path.enum';

interface PublicRouteProps extends PropsWithChildren {
  restricted?: boolean;
}

function PublicRoute({ restricted = false, children }: PublicRouteProps) {
  // TODO: Add selector
  const auth = false;
  const location = useLocation();

  if (auth && restricted) {
    return <Navigate to={Path.PRIVATE} state={{ from: location }} replace />;
  }

  return children;
}

export default PublicRoute;
