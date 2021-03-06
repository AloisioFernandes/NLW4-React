import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext'

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css'

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) { // props do getServerSideProps
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => { // função do next para monitorar quais dados são passados da camada do next para o front-end
  // tudo feito nessa função executa no servidor node.js do next e não no navegador. Permite que motores de busca leiam o conteúdo da aplicação na hora de indexar
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies // recebe todos os cookies da aplicação

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}