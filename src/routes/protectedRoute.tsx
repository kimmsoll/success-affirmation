import { useAuthContext } from 'context/AuthContext';
import { ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactElement;
  redirectUrl: string;
}

const ProtectedRoute = ({ children, redirectUrl }: Props) => {
  const auth = useAuthContext();

  if (!auth?.isAuthed) {
    return <Navigate to={redirectUrl} replace />;
  }
  return children;
};

export default ProtectedRoute;
