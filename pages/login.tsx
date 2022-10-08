import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

const StyledWrapper = styled.div`
    border: solid 1px red;
    padding-top: 120px;
`;

export default function Login() {
    const { register, handleSubmit } = useForm();
    const authContext = useContext(AuthContext);

    function handleSignIn(data:any) {
        authContext.signIn(data)
    }

    return (
        <StyledWrapper>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(handleSignIn)} method="POST    ">
                <label>
                    E-mail:
                    <input type="email" required {...register('email')}></input>
                </label>

                <label>
                    Senha:
                    <input type="password" required {...register('password')}></input>
                </label>
                <button type='submit'>Entrar</button>
            </form>
        </StyledWrapper>
    )
}