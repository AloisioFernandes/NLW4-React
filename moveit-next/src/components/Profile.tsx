import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'

import styles from '../styles/components/Profile.module.css'

export function Profile() {
  const { level } = useContext(ChallengesContext)

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/AloisioFernandes.png" alt="Aloísio Fernandes"/>
      <div>
        <strong>Aloísio Fernandes</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/> {/*Busca primeiramente na pasta public*/}
          Level {level}
        </p>
      </div>
    </div>
  )
}