import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthed: boolean | undefined;
  setIsAuthed: (value: boolean) => void;
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

  useEffect(() => {
    if (isAuthed) {
      localStorage.setItem('isAuthedUser', 'true');
    } else {
      localStorage.removeItem('isAuthedUser');
    }
  }, [isAuthed]);

  return <AuthContext.Provider value={{ isAuthed, setIsAuthed }}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  return useContext(AuthContext);
}
