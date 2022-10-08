import styled from 'styled-components';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { useForm } from 'react-hook-form';

const StyledWrapper = styled.div`
 padding-top: 120px;
`;

export default function Register() {
    const authContext = useContext(AuthContext);

    const { register, handleSubmit } = useForm()

    function handleRegister(data: any) {
        authContext.register(data)
    }

    return (
        <StyledWrapper>
            <form onSubmit={handleSubmit(handleRegister)}>
                <label>
                    Nome:
                    <input type='text' required autoComplete='on' {...register('name')}></input>
                </label>

                <label>
                    Email:
                    <input type='email' required autoComplete='on' {...register('email')}></input>
                </label>

                <label>
                    Senha:
                    <input type='password' required autoComplete='on' {...register('password')}></input>
                </label>

                <button type='submit'>Entrar</button>
            </form>
        </StyledWrapper>
    )
}