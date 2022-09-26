import Link from 'next/link';
import styled from 'styled-components';
import Cart from './Cart';

const StyledNav = styled.nav`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    ul {
        display: flex;
        width: 70%;
        column-gap: 10px;
        justify-self: center;
        
        li {
            display: flex;
            flex-grow: 1;
            border: solid 2px black;
            transition: flex-grow 0.3s ease;   
            background-color: white;                    
            
            &:hover {
                flex-grow: 3;
            }

            a {
                padding: 10px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: white;
                color: black;
                transition: background-color 0.3s ease, color 0.3s ease;

                &:hover {
                    background-color: black;
                    color: white;
                }
            }
        }
    }
`;

export default function Nav() {
    return (
        <StyledNav>
            <ul>
                <li>
                    <Link href='/'>
                        Início
                    </Link>
                </li>

                <li>
                    <Link href='/products'>
                        Produtos
                    </Link>
                </li>

                <li>
                    <Cart />
                </li>
            </ul>
        </StyledNav>
    )
}