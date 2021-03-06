import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return ( // todos os elementos dentro do provider terão acesso aos dados do contexto
    <Component {...pageProps} />
  )
}

export default MyApp
