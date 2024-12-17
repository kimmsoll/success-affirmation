import { useAuthContext } from 'context/AuthContext';
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ children }: { children: React.ReactElement }) => {
  const auth = useAuthContext();

  if (auth?.isAuthed) {
    return <Navigate to='/home' replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;
