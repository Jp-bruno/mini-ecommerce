import { useContext } from "react"
import { CartContext } from "../contexts/cartContext";
import CartItem from "./CartItem";
import styled from 'styled-components';

const StyledCart = styled.div`
    position: absolute;
    background: white;
    color: black;
    width: 100%;
    transition: background-color 0.3s ease, color 0.3s ease;
    cursor: pointer;
    text-align: center;
    bottom: -60px;
    border: solid 1px red;
    width: 30%;

    &:hover {
        background-color: black;
        color: white;
    }
`;

function RenderCartItems() {
    const cartContext = useContext(CartContext);

    return cartContext.products.length === 0 ?
        <p>Carrinho vazio</p>
        :
        <>
            <ul>
                {
                    cartContext.products.map(el => <CartItem key={Math.random() * 1000} name={el.name} quantity={el.quantity} image={el.image} />)
                }
            </ul>

            <form action="/api/checkout_sessions" method="POST" >
                {
                    cartContext.products.map(el => {
                        return (
                            <>
                                <input key='name' readOnly hidden value={el.name} name='name' />
                                <input key='quantity' readOnly hidden value={el.quantity} name='quantity' />
                                <input key='id' readOnly hidden value={el.id} name='id' />
                            </>
                        )
                    })
                }
                <button type="submit">Checkout</button>
            </form>
        </>
}

export default function Cart() {
    return (
        <StyledCart>
            <RenderCartItems />
        </StyledCart>
    )
}