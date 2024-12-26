import Header from 'components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import ROUTES from 'routes';

const MainLayout = () => {
  const location = useLocation();
  const isHeader = location.pathname !== ROUTES.ROOT && location.pathname !== ROUTES.KAKAO_AUTH;

  return (
    <>
      {isHeader && <Header />}
      <Outlet />
    </>
  );
};

export default MainLayout;
