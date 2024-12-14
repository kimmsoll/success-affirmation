import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Header = () => {
  const navigate = useNavigate();

  const handleClickLogout = async () => {
    // kakao logout
    const kakaoToken = await window.Kakao.Auth.getAccessToken();
    if (!!kakaoToken) {
      try {
        const res = await window.Kakao.Auth.logout();
        if ('id' in res) {
          navigate('/');
        }
      } catch (e) {
        console.log('카카오 로그아웃 에러!', e);
      }
    }
  };

  const handleClickAdd = () => {};

  return (
    <header className='flex justify-end px-5 py-5 shadow shadow-gray-900'>
      <ul className='flex gap-2'>
        <li>
          <Button onClick={handleClickLogout} size='sm' text='로그아웃' />
        </li>
        <li>
          <Button onClick={handleClickLogout} size='sm' text='확언등록' />
        </li>
      </ul>
    </header>
  );
};

export default Header;
