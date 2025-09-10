export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty'
export type GameStatus = 'playing' | 'won' | 'lost'
export type ThemeMode = 'light' | 'dark'
export type ColorBlindMode = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia'

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

export interface ThemeSettings {
  mode: ThemeMode
  colorBlindMode: ColorBlindMode
}

export interface ColorPalette {
  correct: string
  present: string
  absent: string
  empty: string
  border: string
  text: string
  background: string
  surface: string
  textSecondary: string
}
