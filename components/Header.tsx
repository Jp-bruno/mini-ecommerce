import styled from 'styled-components';
import CartIcon from './CartButton';
import Logo from "./Logo";

const StyledHeader = styled.header`
    display: flex;
    background-color: white;
    position: absolute;
    width: 100%;
    box-shadow: 0px 2px 20px rgba(0,0,0,0.3);
    height: 120px;
    
    .header-inner-div {
        display: flex;
        width: 100%;
        position: relative;
        padding-inline: 70px;
        padding-bottom: 20px;
        padding-top: 20px;
        align-items: center;
        justify-content: flex-end;
    }
`


export default function Header() {
    return (
        <StyledHeader>
            <div className='header-inner-div'>
                <Logo />
                <CartIcon />
                {/* <Nav /> */}
            </div>
        </StyledHeader>
    )
}