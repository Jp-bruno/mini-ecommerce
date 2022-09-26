import Image from "next/image";
import styled from "styled-components";
import { CartContext } from "../contexts/cartContext";
import { useContext } from "react";
import Cart from "./Cart";

const Button = styled.button`
    background-color: white;
    padding: 10px;
    border: solid 2px rgba(0,0,0,0.3);
    border-radius: 50px;
    position: relative;

    &:hover {
        background-color: rgba(0,0,0,0.01);
    }

    &::after {
        content: attr(data-items);
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
        top: -5px;
        right: -10px;
        background: black;
        position: absolute;
        color: white;
    }
`;


export default function CartIcon() {
    const cardContext = useContext(CartContext);

    return (
        <>
            <Button data-items={cardContext.products.length}>
                <Image src='/cart.png' width='20%' height='20%' layout="fixed" alt='cart' />
            </Button>

            <Cart />
        </>
    )
}