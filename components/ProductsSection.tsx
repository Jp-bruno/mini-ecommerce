import styled from 'styled-components';
import { useEffect, useState } from "react"
import ProductIcon from "../components/ProductIcon";

const StyledSection = styled.section`
    padding: 50px;
    box-shadow: inset 10px 0px 40px rgba(0,0,0,0.1);

    ul {
        width: 100%;
        display: flex;
        column-gap: 20px;
        margin: 0;
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
                    state.items.map((el:{name:string, images:string[], value:string, id:string}) =>
                        <li key={Math.random() * 1000}>
                            <ProductIcon name={el.name} imgsrc={el.images[0]} value={el.value} id={el.id} />
                        </li>
                    )
                }
            </ul>
        </StyledSection>
    )
}