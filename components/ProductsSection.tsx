import styled from 'styled-components';
import { useEffect, useState } from "react"
import ProductIcon from "../components/ProductIcon";

const StyledSection = styled.section`
border: solid 5px green;

    ul {
        width: 100%;
        display: flex;
        
    }
`;

export default function ProductsSection() {
    const [state, setState] = useState({ items: [] })

    useEffect(() => {
        (async () => {
            const items = await (await fetch('/api/get_products')).json();
            setState({ items: items })
        })()
    }, [])

    return (
        <StyledSection>
            <ul>
                {
                    state.items.length === 0 ? 
                    <p>carregando...</p>
                    :
                    state.items.map(el =>
                        <li key={Math.random() * 1000}>
                            <ProductIcon name={el.name} imgsrc={el.images[0]} value={el.value} id={el.id} />
                        </li>
                    )
                }
            </ul>
        </StyledSection>
    )
}