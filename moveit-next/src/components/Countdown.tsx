import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout // variável global do tipo Timeout

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(0.05 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  // padStart verifica se string tem 2 caracteres, se não preenche à esquerda (início da string) com '0'
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('') // split('') dividirá a string em um array com cada caractere ocupando um índice
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('') // split('') dividirá a string em um array com cada caractere ocupando um índice

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout) // interrompe execução do setTimeout
    setIsActive(false)
    setTime(0.05 * 60)
  }

  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button 
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
        <>
          { isActive ? (
            <button 
              type="button" 
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button 
              type="button" 
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          ) }
        </>
      )}
    </div>
  )
}