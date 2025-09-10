import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { GameState, GameStats } from '@/types/game'
import { STORAGE_KEYS, WORD_LENGTH, MAX_GUESSES } from '@/lib/constants'
import { 
  getInitialGameState, 
  getInitialStats, 
  isValidGuess, 
  isGameWon,
  updateStats,
  getLetterStatus
} from '@/lib/gameLogic'

export function useGameState() {
  const [gameState, setGameState] = useLocalStorage<GameState>(
    STORAGE_KEYS.gameState,
    getInitialGameState()
  )
  
  const [gameStats, setGameStats] = useLocalStorage<GameStats>(
    STORAGE_KEYS.gameStats,
    getInitialStats()
  )

  const addLetter = useCallback((letter: string) => {
    setGameState(prev => {
      if (prev.gameStatus !== 'playing' || prev.currentCol >= WORD_LENGTH) {
        return prev
      }
      
      const newGuesses = [...prev.guesses]
      newGuesses[prev.currentRow] = 
        (newGuesses[prev.currentRow] || '') + letter.toUpperCase()
      
      return {
        ...prev,
        guesses: newGuesses,
        currentCol: prev.currentCol + 1
      }
    })
  }, [setGameState])

  const removeLetter = useCallback(() => {
    setGameState(prev => {
      if (prev.gameStatus !== 'playing' || prev.currentCol <= 0) {
        return prev
      }
      
      const newGuesses = [...prev.guesses]
      const currentGuess = newGuesses[prev.currentRow] || ''
      newGuesses[prev.currentRow] = currentGuess.slice(0, -1)
      
      return {
        ...prev,
        guesses: newGuesses,
        currentCol: prev.currentCol - 1
      }
    })
  }, [setGameState])

  const submitGuess = useCallback(() => {
    setGameState(prev => {
      const currentGuess = prev.guesses[prev.currentRow] || ''
      
      if (prev.gameStatus !== 'playing' || !isValidGuess(currentGuess)) {
        return prev
      }
      
      const isWon = isGameWon(currentGuess)
      const isLastGuess = prev.currentRow >= MAX_GUESSES - 1
      
      let newGameStatus: GameState['gameStatus'] = prev.gameStatus
      if (isWon) {
        newGameStatus = 'won'
      } else if (isLastGuess) {
        newGameStatus = 'lost'
      }
      
      const newState = {
        ...prev,
        currentRow: prev.currentRow + 1,
        currentCol: 0,
        gameStatus: newGameStatus
      }
      
      // Update stats when game ends
      if (newGameStatus !== 'playing') {
        const updatedStats = updateStats(newState, gameStats)
        setGameStats(updatedStats)
      }
      
      return newState
    })
  }, [setGameState, gameStats, setGameStats])

  const resetGame = useCallback(() => {
    setGameState(getInitialGameState())
  }, [setGameState])

  const getKeyboardLetterStatus = useCallback((letter: string) => {
    return getLetterStatus(letter, gameState.guesses)
  }, [gameState.guesses])

  const canSubmit = gameState.currentCol === WORD_LENGTH && gameState.gameStatus === 'playing'
  const canAddLetter = gameState.currentCol < WORD_LENGTH && gameState.gameStatus === 'playing'
  const canRemoveLetter = gameState.currentCol > 0 && gameState.gameStatus === 'playing'

  return {
    gameState,
    gameStats,
    addLetter,
    removeLetter,
    submitGuess,
    resetGame,
    getKeyboardLetterStatus,
    canSubmit,
    canAddLetter,
    canRemoveLetter
  }
}
