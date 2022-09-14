import Link from "next/link";
import Cart from "./Cart";
import styled from 'styled-components';

const StyledHeader = styled.header`
    border: solid 1px red;
    display: flex;

    .header-inner-div {
        border: solid 1px red;
        display: flex;
        justify-content: space-between;
        width: 100%;
        position: relative;

        nav ul {
            border: solid 1px red;
            display: flex;
            
            li {
                padding: 10px;
            }
        }
    }
`


export default function Header() {
    return (
        <StyledHeader>
            <div className='header-inner-div'>
                <nav>
                    <ul>
                        <li>
                            <Link href='/'>Início</Link>
                        </li>

                        <li>
                            <Link href='/products'>Produtos</Link>
                        </li>
                    </ul>
                </nav>

                <Cart />
            </div>
        </StyledHeader>
    )
}