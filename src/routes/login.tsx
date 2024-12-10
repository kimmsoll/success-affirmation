const Login = () => {
  const handleKakaoAuthorize = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    });
  };

  return (
    <div className='h-full bg-zinc-950 flex justify-center items-center'>
      <div className='flex flex-col gap-20'>
        <header className='text-center'>
          <h1 className='text-2xl text-neutral-50 whitespace-pre-wrap'>{`매일 당신의 목소리로\n성공을 확언하세요.`}</h1>
        </header>
        <button onClick={handleKakaoAuthorize} type='button' className='flex justify-center'>
          <img src='img/kakao_login_medium_narrow.png' width='auto' />
        </button>
      </div>
    </div>
  );
};

export default Login;
