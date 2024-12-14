import Header from 'components/Header';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  const isHeader = location.pathname !== '/' && location.pathname !== '/auth';

  return (
    <>
      {isHeader && <Header />}
      <Outlet />
    </>
  );
};

export default MainLayout;
