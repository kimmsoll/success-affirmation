import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
  isAuthed: boolean | undefined;
  setIsAuthed: (value: boolean) => void;
}
interface AuthContextProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthed, setIsAuthed] = useState<boolean>();

  return <AuthContext.Provider value={{ isAuthed, setIsAuthed }}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  return useContext(AuthContext);
}
