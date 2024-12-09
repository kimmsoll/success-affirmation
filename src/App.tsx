import { Outlet, useLoaderData } from 'react-router-dom';

function App() {
  const kakaoInitLoaderData: { isKakaoInitialized: boolean } = useLoaderData();
  if (!kakaoInitLoaderData.isKakaoInitialized) alert('Kakao SDK 초기화가 실행되지 않았습니다.');

  return <Outlet />;
}

export default App;
