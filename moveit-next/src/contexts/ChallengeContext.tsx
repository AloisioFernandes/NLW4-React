import { createContext, ReactNode, useState } from 'react'

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
}

interface ChallengeProviderProps {
  children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData) // indica formato do objeto para auto complete

export function ChallengesProvider({ children }: ChallengeProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    window.alert('New Challenge')
  }

  return( // todos os elementos dentro do provider terão acesso aos dados do contexto
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengesCompleted,
        levelUp, 
        startNewChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}