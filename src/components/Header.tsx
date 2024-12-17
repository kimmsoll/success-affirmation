import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import { useAuthContext } from 'context/AuthContext';

const Header = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const handleClickLogout = async () => {
    // kakao logout
    const kakaoToken = await window.Kakao.Auth.getAccessToken();
    if (!!kakaoToken) {
      try {
        const res = await window.Kakao.Auth.logout();
        if ('id' in res) {
          auth?.setIsAuthed(false);
          navigate('/');
        }
      } catch (e) {
        console.log('카카오 로그아웃 에러!', e);
      }
    }
  };

  const handleClickAdd = () => {
    navigate('/affirmation/create');
  };

  return (
    <header className='z-10 sticky top-0 w-full flex justify-end px-5 py-5 bg-black-600 shadow shadow-gray-900'>
      <ul className='flex gap-2'>
        <li>
          <Button onClick={handleClickLogout} style='sm' text='로그아웃' />
        </li>
        <li>
          <Button onClick={handleClickAdd} style='sm' text='확언등록' />
        </li>
      </ul>
    </header>
  );
};

export default Header;
