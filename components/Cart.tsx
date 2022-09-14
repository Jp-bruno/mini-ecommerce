import { useContext } from "react"
import { CartContext } from "../contexts/cartContext";
import CartItem from "./CartItem";
import styled from 'styled-components';

const StyledCart = styled.div`
    border: solid 1px red;
    position: absolute;
    right: 0;
    background: white;
    color: black;

`;

function RenderCartItems() {
    const cartContext = useContext(CartContext);

    return cartContext.products.length === 0 ?
        <p>O carrinho está vazio</p>
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
            <strong>Carrinho</strong>

            <RenderCartItems />
        </StyledCart>
    )
}