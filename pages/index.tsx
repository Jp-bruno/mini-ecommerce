import type { NextPage } from 'next';
import styled from 'styled-components';
import ProductsSection from '../components/ProductsSection';

const Styled = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 200px;
  padding-bottom: 170px;
  padding-inline: 70px;
  background-color: white;

  h1 {
    color: black;
  }
`;



const Home: NextPage = () => {
  return (
    <Styled>
      {/* <h1>Loja</h1> */}
      <ProductsSection />
    </Styled>
  )
}

export default Home
