import styled from 'styled-components';
import { Product } from '../contexts/cartContext';

const StyledItem = styled.li`
    border-top: solid 1px rgba(0,0,0,0.6);
`;

export default function CartItem({quantity, name, image}:Partial<Product>) {
    return (
        <StyledItem>
            Produto: {name} 
            <br></br> 
            Quantidade: {quantity}
        </StyledItem>
    )
}