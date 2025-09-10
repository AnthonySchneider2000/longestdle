import { TARGET_WORD, WORD_LENGTH } from './constants'
import { LetterStatus, GameState, GameStats } from '@/types/game'

export function checkGuess(guess: string): LetterStatus[] {
  const result: LetterStatus[] = new Array(WORD_LENGTH).fill('absent')
  const targetLetters = TARGET_WORD.toUpperCase().split('')
  const guessLetters = guess.toUpperCase().split('')
  
  // First pass: mark correct positions
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = 'correct'
      targetLetters[i] = '*' // Mark as used
      guessLetters[i] = '*' // Mark as used
    }
  }
  
  // Second pass: mark present letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessLetters[i] !== '*') {
      const targetIndex = targetLetters.indexOf(guessLetters[i])
      if (targetIndex !== -1) {
        result[i] = 'present'
        targetLetters[targetIndex] = '*' // Mark as used
      }
    }
  }
  
  return result
}

export function isValidGuess(guess: string): boolean {
  return guess.length === WORD_LENGTH && /^[A-Za-z]+$/.test(guess)
}

export function isGameWon(guess: string): boolean {
  return guess.toUpperCase() === TARGET_WORD.toUpperCase()
}

export function getLetterStatus(letter: string, guesses: string[]): LetterStatus {
  let status: LetterStatus = 'empty'
  
  for (const guess of guesses) {
    if (guess.length === WORD_LENGTH) {
      const guessResult = checkGuess(guess)
      const guessLetters = guess.toUpperCase().split('')
      
      for (let i = 0; i < guessLetters.length; i++) {
        if (guessLetters[i] === letter.toUpperCase()) {
          const letterStatus = guessResult[i]
          
          // Priority: correct > present > absent
          if (letterStatus === 'correct') {
            return 'correct'
          } else if (letterStatus === 'present' && status === 'empty') {
            status = 'present'
          } else if (letterStatus === 'absent' && status === 'empty') {
            status = 'absent'
          }
        }
      }
    }
  }
  
  return status
}

export function generateShareText(gameState: GameState): string {
  const { guesses, gameStatus, currentRow } = gameState
  const attempts = gameStatus === 'won' ? currentRow : 'X'
  
  let shareText = `Longestdle ${attempts}/6\n\n`
  
  for (let i = 0; i < guesses.length; i++) {
    if (guesses[i] && guesses[i].length === WORD_LENGTH) {
      const result = checkGuess(guesses[i])
      const row = result.map(status => {
        switch (status) {
          case 'correct': return '🟩'
          case 'present': return '🟨'
          case 'absent': return '⬛'
          default: return '⬜'
        }
      }).join('')
      shareText += row + '\n'
    }
  }
  
  shareText += '\nhttps://longestdle.vercel.app'
  return shareText
}

export function updateStats(gameState: GameState, currentStats: GameStats): GameStats {
  const newStats = { ...currentStats }
  
  if (gameState.gameStatus === 'won' || gameState.gameStatus === 'lost') {
    newStats.gamesPlayed += 1
    
    if (gameState.gameStatus === 'won') {
      newStats.gamesWon += 1
      newStats.currentStreak += 1
      newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak)
      
      // Update guess distribution
      const guessCount = gameState.currentRow
      newStats.guessDistribution[guessCount] = (newStats.guessDistribution[guessCount] || 0) + 1
    } else {
      newStats.currentStreak = 0
    }
  }
  
  return newStats
}

export function getInitialGameState(): GameState {
  return {
    currentRow: 0,
    currentCol: 0,
    guesses: new Array(6).fill(''),
    gameStatus: 'playing',
    letterStatuses: {}
  }
}

export function getInitialStats(): GameStats {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: {}
  }
}
