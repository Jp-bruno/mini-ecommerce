import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    .logo {
        filter: invert(100%);
    }
`

export default function Logo() {
    return (
        <Wrapper>
            <Image src='/logo.jpg' width={100} height={100} layout={'intrinsic'} alt='logo' className='logo' />
        </Wrapper>
    )
}