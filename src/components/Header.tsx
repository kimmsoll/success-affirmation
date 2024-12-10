import { useNavigate } from 'react-router-dom';

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

  return (
    <header className='flex justify-end p-10'>
      <button type='button' onClick={handleClickLogout} className='p-1'>
        로그아웃.
      </button>
    </header>
  );
};

export default Header;
