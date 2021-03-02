import { ChallengesProvider } from '../contexts/ChallengeContext'

import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return ( // todos os elementos dentro do provider terão acesso aos dados do contexto
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp
