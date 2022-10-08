import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CartContextProvider from '../contexts/cartContext'
import Header from '../components/Header'
import AuthContextProvider from '../contexts/authContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <Header />
        <Component {...pageProps} />
      </CartContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
