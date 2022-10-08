import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

type AuthType = {
    isAuth: boolean,
    signIn: ({ email, password }: SignInDataType) => Promise<void>,
    userState: UserType | null | undefined,
    register: ({ email, password }: any) => Promise<void>;
}

type SignInDataType = {
    email: string,
    password: string
}

type UserType = {
    name: string,
    email: string,
    avatar: string
}

export const AuthContext = createContext({} as AuthType)

export default function AuthContextProvider({ children }: PropsWithChildren) {
    const [userState, setUser] = useState<UserType | null>();

    useEffect(() => {
        const { 'store.auth.token': token } = parseCookies();

        (async () => {
            if (token) {
                const data = await fetch('/api/retrieveUserDataByToken', { body: token, method: 'post' }).then(res => res.json());
                console.log('User found')
                console.log(data)
                setUser(data)
            } else {
                console.log('No user found')
            }
        })()
    }, [])

    const isAuth = !!userState;

    async function signIn({ email, password }: SignInDataType) {
        let stringBody = JSON.stringify({ email, password })

        const { token, user } = await fetch('/api/auth', { body: stringBody, method: 'post' }).then(res => res.json())


        setCookie(undefined, 'store.auth.token', token, {
            maxAge: 60 * 60, //1 hora
        })

        setUser(user)

        Router.push('/user')
    }

    async function register(credentials: any) {
        let stringBody = JSON.stringify(credentials)
        const data = await fetch('/api/user/createUser', { method: 'POST', body: stringBody }).then(res => res)
        console.log(data)
    }


    return (
        <AuthContext.Provider value={{ isAuth, signIn, userState, register }}>
            {children}
        </AuthContext.Provider>
    )
}