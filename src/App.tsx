import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from 'context/AuthContext';
import MainLayout from 'layouts/MainLayout';
import { useLoaderData } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  const kakaoInitLoaderData: { isKakaoInitialized: boolean } = useLoaderData();
  if (!kakaoInitLoaderData.isKakaoInitialized) alert('Kakao SDK 초기화가 실행되지 않았습니다.');

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
