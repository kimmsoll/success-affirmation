type LogoutResponse = { id: number };
type KakaoAuthError = { code: number; msg: string };

type APIRequestSettings = { url: string; data?: any; files?: any };
declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        //TODO: any
        authorize: (params: any) => void;
        setAccessToken: (token: string) => void;
        getAccessToken: () => string;
        logout: () => Promise<LogoutResponse | KakaoAuthError>;
      };
      API: {
        request: (settings: APIRequestSettings) => Promise<any>;
        cleanup: () => void;
      };
    };
  }
}

export const kakaoInitLoader = async (): Promise<{ isKakaoInitialized: boolean }> => {
  if (!window.Kakao) {
    throw new Error('Kakao SDK가 로드되지 않았습니다.');
  }

  if (!window.Kakao.isInitialized()) {
    await window.Kakao.init(process.env.REACT_APP_KAKAO_Javascript_KEY!);
  }
  const isInitialized = window.Kakao.isInitialized();
  return { isKakaoInitialized: isInitialized };
};
