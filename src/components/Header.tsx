import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import { useAuthContext } from 'context/AuthContext';
import { useModal } from 'hooks/useModal';
import FeedbackModal from './Modal/FeedbackModal';
import ROUTES from 'routes';

const Header = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const isCreatePage = location.pathname === ROUTES.CREATE;

  const { isOpen, openModal, closeModal, modalType } = useModal();
  const isConfirmModal = modalType === 'confirm';

  const handleLogout = async () => {
    // kakao logout
    const kakaoToken = await window.Kakao.Auth.getAccessToken();

    if (!!kakaoToken) {
      try {
        const res = await window.Kakao.Auth.logout();
      } catch (e) {
        openModal('error');
        console.log('카카오 로그아웃 에러!', e);
      }
    }

    // logout
    auth?.setIsAuthed(false);
    navigate('/');
  };

  const handleClickLogout = () => {
    openModal('confirm');
  };

  const handleClickAdd = () => {
    navigate(ROUTES.CREATE);
  };

  return (
    <>
      <header className='z-10 sticky top-0 w-full flex justify-end px-5 py-5 bg-black-600 shadow shadow-gray-900'>
        <ul className='flex gap-2'>
          <li>
            <Button onClick={handleClickLogout} style='sm_gray' text='로그아웃' />
          </li>
          {!isCreatePage && (
            <li>
              <Button onClick={handleClickAdd} style='sm_white' text='확언생성' />
            </li>
          )}
        </ul>
      </header>
      <FeedbackModal
        isOpen={isOpen}
        onClose={closeModal}
        title={isConfirmModal ? '로그아웃' : '로그아웃 실패'}
        message={isConfirmModal ? '로그아웃 하시겠습니까?' : '로그아웃에 실패했습니다. 다시 시도해주세요.'}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Header;
