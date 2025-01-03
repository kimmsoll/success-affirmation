import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthed: boolean | undefined;
  setIsAuthed: (value: boolean) => void;
  authedUserId: string | undefined;
}
interface AuthContextProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthed, setIsAuthed] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('isAuthedUser');
    return storedAuth === 'true';
  });
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
      }
    } catch (e) {
      console.log('카카오 사용자 정보 요청 에러!', e);
      return null;
    }
  };

  useEffect(() => {
    if (isAuthed) {
      setKakaoUserInfo();
      localStorage.setItem('isAuthedUser', 'true');
    } else {
      localStorage.removeItem('isAuthedUser');
    }
  }, [isAuthed]);

  return <AuthContext.Provider value={{ isAuthed, setIsAuthed, authedUserId }}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  return useContext(AuthContext);
}
