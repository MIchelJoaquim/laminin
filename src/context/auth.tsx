import { createContext, FC } from "react"
import { IConsultant } from "../types/user";
import { LoginFormData } from "../views/auth/login/login.types";
import { MsgData } from './../types/services';
import useAuth from './../hooks/useAuth';

export interface AuthContextData {
  authenticated: boolean;
  handleLogin(crendential: LoginFormData): Promise<MsgData<IConsultant> | undefined>;
  handleLogout (): void;
  user: object | null;
 }

 const AuthContext = createContext<AuthContextData | null>(null);

 const AuthProvider: FC = ({ children }) => {
   const { loading, user, handleLogin, handleLogout} = useAuth();

   // TODO: use progressbar
  if(loading) return <h1>LOADING...</h1>

  return (
    <AuthContext.Provider value={{ authenticated: Boolean(user), user,  handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
