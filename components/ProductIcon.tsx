import styled from 'styled-components';
import Image from 'next/image';
import { useContext } from 'react';
import { CartContext } from '../contexts/cartContext';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: solid 1px red;
    width: fit-content;
    position: relative;
    text-align: center;

    .product-icon-buttons {
        display: flex;
        flex-direction: column;

        button {
            cursor: pointer;
        }
    }
`;

type ProductIconProps = {
    name: string,
    imgsrc: string,
    value: string,
    id: string
}

export default function ProductIcon({name, imgsrc, value, id}: ProductIconProps) {
    const cartContext = useContext(CartContext);
    
    return (
        <Wrapper>
            <Image layout='intrinsic' width={100} height={100} src={imgsrc} alt='produto'></Image>
            <strong>{name}</strong>
            <span>R$ {value}</span>
            <div className='product-icon-buttons' data-id={id} data-name={name} data-value={value} data-image={imgsrc}>
                <button onClick={cartContext.addItemToCart}>Adicionar ao Carrinho</button>
                <button>Comprar agora</button>
            </div>
        </Wrapper>
    )
}