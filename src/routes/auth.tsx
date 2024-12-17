import { useAuthContext } from 'context/AuthContext';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const KakaoAuth = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const auth = useAuthContext();

  const setAccessToken = async (token: string) => {
    await window.Kakao.Auth.setAccessToken(token);
    auth?.setIsAuthed(true);
  };

  const getAccessToken = async (code: string) => {
    // code 로 kakao accessToken 받기 요청
    try {
      const res = await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.REACT_APP_KAKAO_REST_API_KEY!,
          redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI!,
          code,
        }),
      });

      const data = await res.json();
      if (data.access_token) return data.access_token;
    } catch (e) {
      console.log('토큰 요청 에러!', e);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      if (code) {
        try {
          const token = await getAccessToken(code);
          if (token) {
            setAccessToken(token);
          }
        } catch (e) {
          console.log('토큰 요청 에러!', e);
        }
      }
    })();
  }, [code]);

  return <></>;
};

export default KakaoAuth;
