import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge; 
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengeProviderProps {
  children: ReactNode
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData) // indica formato do objeto para auto complete

export function ChallengesProvider({ children, ...rest }: ChallengeProviderProps) { // as propriedades level, currentExperience e challengesCompleted estão dentro do objeto ...rest
  const [level, setLevel] = useState(rest.level ?? 1) // se rest.level não existir o valor inicial de level é 1
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0) // se rest.currentExperience não existir o valor inicial de currentExperience é 0
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0) // se rest.challengesCompleted não existir o valor inicial de challengesCompleted é 0

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission() // solicita permissão para enviar notificações ao usuário
  }, [])

  useEffect(() => { // salva informações do usuário em cookies
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length) // retorna um número aleatório entre 0 e o tamanho do array de desafios
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play() // toca áudio de forma nativa

    if(Notification.permission === 'granted') { // se o usuário permitiu notificações
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if(finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return( // todos os elementos dentro do provider terão acesso aos dados do contexto
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        experienceToNextLevel,
        challengesCompleted,
        activeChallenge,
        levelUp, 
        startNewChallenge,
        resetChallenge,
        completeChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}