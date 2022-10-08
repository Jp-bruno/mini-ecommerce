import styled from 'styled-components';
import Image from 'next/image';
import { useContext } from 'react';
import { CartContext } from '../contexts/cartContext';
import Link from 'next/link';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 10px 10px 10px 10px;
    color: black;
    border: solid 1px black;

    img[alt='produto'] {
        border: solid 1px black !important;
    }

    .product-info {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        border-inline: solid 1px black;
        margin-bottom: 10px;

        a {
            &:hover {
                text-decoration: underline;
            }
        }
    }

    .product-icon-buttons {
        display: flex;
        flex-direction: column;
        row-gap: 10px;

        button {
            padding: 10px;
            border: solid 2px black;
            cursor: pointer;
            background-color: white;
            width: 100%;
            color: black;
            transition: background-color 0.3s ease, color 0.3s ease;
            font-weight: 500;

            &:hover {
                background-color: black;
                color: white;
                border-color: white;
            }
        }
    }
`;

type ProductIconProps = {
    name: string,
    imgsrc: string,
    value: string,
    id: string
}

export default function ProductIcon({ name, imgsrc, value, id }: ProductIconProps) {
    const cartContext = useContext(CartContext);

    async function test() {
        const data = await fetch('/api/user/getUser', { method: 'GET' }).then(res => res)

        console.log(data)
    }

    return (
        <Wrapper>
            <Image layout='fixed' width={'200%'} height={'200%'} src={imgsrc} alt='produto' />

            <div className='product-info'>
                <Link href='/'>{name}</Link>
                R$ {value}
            </div>

            <div className='product-icon-buttons' data-id={id} data-name={name} data-value={value} data-image={imgsrc}>
                <button onClick={cartContext.addItemToCart}>Adicionar ao Carrinho</button>
                <button onClick={test}>Comprar agora</button>
            </div>
        </Wrapper>
    )
}