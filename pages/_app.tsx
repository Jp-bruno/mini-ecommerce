import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CartContextProvider from '../contexts/cartContext'
import Header from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Header />
      <Component {...pageProps} />
    </CartContextProvider>
  )
}

export default MyApp
