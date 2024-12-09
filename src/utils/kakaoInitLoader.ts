declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
    };
  }
}

export const kakaoInitLoader = async (): Promise<{ isKakaoInitialized: boolean }> => {
  if (!window.Kakao) {
    throw new Error('Kakao SDK가 로드되지 않았습니다.');
  }

  if (!window.Kakao.isInitialized()) {
    await window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY!);
  }
  const isInitialized = window.Kakao.isInitialized();
  return { isKakaoInitialized: isInitialized };
};
