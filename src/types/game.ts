export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty'
export type GameStatus = 'playing' | 'won' | 'lost'

export interface GameState {
  currentRow: number
  currentCol: number
  guesses: string[]
  gameStatus: GameStatus
  letterStatuses: Record<string, LetterStatus>
}

export interface GameStats {
  gamesPlayed: number
  gamesWon: number
  currentStreak: number
  maxStreak: number
  guessDistribution: Record<number, number>
}

export interface Tile {
  letter: string
  status: LetterStatus
}
