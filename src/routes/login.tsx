import Typical from 'react-typical';

const Login = () => {
  const handleKakaoAuthorize = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    });
  };

  return (
    <div className='h-full flex justify-center items-center'>
      <div className='flex flex-col gap-12'>
        <header className='text-center'>
          <h1 className='text-2xl font-bold text-gray-100  whitespace-pre-wrap'>
            <Typical steps={['매일 당신의 목소리로', 2000]} loop={1} wrapper='p' />
            <Typical steps={[2000, '성공을 확언하세요.', 2000]} loop={1} wrapper='p' />
          </h1>
        </header>
        <button onClick={handleKakaoAuthorize} type='button' className='flex justify-center'>
          <img src='/img/kakao_login_large_narrow.png' width='200px' />
        </button>
      </div>
    </div>
  );
};

export default Login;
