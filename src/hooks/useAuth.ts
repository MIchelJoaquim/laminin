import { useEffect, useState } from 'react';
import { authLogin, tokenVerify } from '../services/auth';
import { MsgData } from '../types/services';
import { LoginFormData } from '../views/auth/login/login.types';
import { IConsultant } from './../types/user';

const saveAuthData = (data: MsgData<IConsultant>) => {
    localStorage.setItem('auth', JSON.stringify(data));
}

const removeAuthData = () => {
    localStorage.removeItem('auth');
}


const useAuth = () => {
    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);

    const handleLogin = async (credentials: LoginFormData) => {

        const { data } = await authLogin(credentials);
        if (data) {
            saveAuthData(data);
            setUser(data);
        }
        return data;

    }

    const handleLogout = () => {
        setUser(null);
        removeAuthData();
    }


    const getAuthData = async () => {

        const auth = localStorage.getItem('auth');
        if (auth) {
            const { accessToken: token } = JSON.parse(auth);
            try {
                const { data: { user } } = await tokenVerify(token) as any;
                setUser(user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }

        }
    }

    useEffect(() => {
        getAuthData();
    }, []);

    return { user, setUser, loading, setLoading, handleLogin, handleLogout }
}

export default useAuth;