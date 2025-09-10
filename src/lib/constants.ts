// The only 45-letter word in existence!
export const TARGET_WORD = 'pneumonoultramicroscopicsilicovolcanoconiosis'

// Game configuration
export const WORD_LENGTH = 45
export const MAX_GUESSES = 6

// Colors matching Wordle
export const COLORS = {
  correct: '#6aaa64',
  present: '#c9b458', 
  absent: '#787c7e',
  empty: '#ffffff',
  border: '#d3d6da',
  darkBorder: '#3a3a3c',
  text: '#1a1a1b',
  darkText: '#ffffff'
} as const

// Keyboard layout
export const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
] as const

// Animation timings (ms)
export const ANIMATIONS = {
  flipDelay: 100,
  shakeDelay: 600,
  bounceDelay: 100
} as const

// Local storage keys
export const STORAGE_KEYS = {
  gameState: 'longestdle-game-state',
  gameStats: 'longestdle-game-stats',
  theme: 'longestdle-theme'
} as const
