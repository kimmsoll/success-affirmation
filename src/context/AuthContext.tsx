import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthed: boolean | undefined;
  setIsAuthed: (value: boolean) => void;
  authedUserId: string | undefined;
  setAccessToken: (value: string) => void;
}
interface AuthContextProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState<boolean>();
  const [accessToken, setAccessToken] = useState<string>();
  const [authedUserId, setAuthedUserId] = useState<string>();

  // TODO: 카카오 로그인 외에 다른 게 추가된다면 따로 분리돼야함
  const setKakaoUserInfo = async () => {
    try {
      const res = await window.Kakao.API.request({
        url: '/v2/user/me',
        data: {
          property_keys: ['kakao_account.name'],
        },
      });
      if (res.id) {
        setAuthedUserId(`${res.id}`);
        return true;
      }
    } catch (e) {
      console.log('카카오 사용자 정보 요청 에러!', e);
      return false;
    }
    return false;
  };

  useEffect(() => {
    (async () => {
      if (accessToken) {
        const isValid = await setKakaoUserInfo();
        setIsAuthed(isValid);
      } else {
        setIsAuthed(false);
      }
      setIsLoading(false);
    })();
  }, [accessToken]);

  useEffect(() => {
    if (!isLoading && isAuthed) {
      localStorage.setItem('isAuthedUser', 'true');
    } else {
      localStorage.removeItem('isAuthedUser');
    }
  }, [isLoading, isAuthed]);

  return (
    <AuthContext.Provider value={{ isAuthed, setIsAuthed, authedUserId, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
