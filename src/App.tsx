import { AuthContextProvider } from 'context/AuthContext';
import { Outlet, useLoaderData } from 'react-router-dom';

function App() {
  const kakaoInitLoaderData: { isKakaoInitialized: boolean } = useLoaderData();
  if (!kakaoInitLoaderData.isKakaoInitialized) alert('Kakao SDK 초기화가 실행되지 않았습니다.');

  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
