import { useAuthContext } from 'context/AuthContext';
import { Navigate } from 'react-router-dom';
import ROUTES from 'routes';

const RedirectIfAuthenticated = ({ children }: { children: React.ReactElement }) => {
  const auth = useAuthContext();

  if (auth?.isAuthed) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;
