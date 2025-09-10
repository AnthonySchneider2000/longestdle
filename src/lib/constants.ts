import { ColorPalette, ThemeMode, ColorBlindMode } from '@/types/game'

// The only 45-letter word in existence!
export const TARGET_WORD = 'pneumonoultramicroscopicsilicovolcanoconiosis'

// Game configuration
export const WORD_LENGTH = 45
export const MAX_GUESSES = 6

// Theme color palettes
export const COLOR_PALETTES: Record<ThemeMode, Record<ColorBlindMode, ColorPalette>> = {
  light: {
    normal: {
      correct: '#6aaa64',
      present: '#c9b458',
      absent: '#787c7e',
      empty: '#ffffff',
      border: '#d3d6da',
      text: '#1a1a1b',
      background: '#ffffff',
      surface: '#f8f9fa',
      textSecondary: '#6c757d'
    },
    protanopia: {
      correct: '#1f77b4',      // Blue instead of green
      present: '#ff7f0e',      // Orange instead of yellow
      absent: '#787c7e',
      empty: '#ffffff',
      border: '#d3d6da',
      text: '#1a1a1b',
      background: '#ffffff',
      surface: '#f8f9fa',
      textSecondary: '#6c757d'
    },
    deuteranopia: {
      correct: '#1f77b4',      // Blue instead of green
      present: '#ff7f0e',      // Orange instead of yellow
      absent: '#787c7e',
      empty: '#ffffff',
      border: '#d3d6da',
      text: '#1a1a1b',
      background: '#ffffff',
      surface: '#f8f9fa',
      textSecondary: '#6c757d'
    },
    tritanopia: {
      correct: '#2ca02c',      // Darker green
      present: '#d62728',      // Red instead of yellow
      absent: '#787c7e',
      empty: '#ffffff',
      border: '#d3d6da',
      text: '#1a1a1b',
      background: '#ffffff',
      surface: '#f8f9fa',
      textSecondary: '#6c757d'
    }
  },
  dark: {
    normal: {
      correct: '#538d4e',
      present: '#b59f3b',
      absent: '#3a3a3c',
      empty: '#121213',
      border: '#3a3a3c',
      text: '#ffffff',
      background: '#121213',
      surface: '#1e1e1e',
      textSecondary: '#9ca3af'
    },
    protanopia: {
      correct: '#3498db',      // Blue instead of green
      present: '#e67e22',      // Orange instead of yellow
      absent: '#3a3a3c',
      empty: '#121213',
      border: '#3a3a3c',
      text: '#ffffff',
      background: '#121213',
      surface: '#1e1e1e',
      textSecondary: '#9ca3af'
    },
    deuteranopia: {
      correct: '#3498db',      // Blue instead of green
      present: '#e67e22',      // Orange instead of yellow
      absent: '#3a3a3c',
      empty: '#121213',
      border: '#3a3a3c',
      text: '#ffffff',
      background: '#121213',
      surface: '#1e1e1e',
      textSecondary: '#9ca3af'
    },
    tritanopia: {
      correct: '#27ae60',      // Darker green
      present: '#e74c3c',      // Red instead of yellow
      absent: '#3a3a3c',
      empty: '#121213',
      border: '#3a3a3c',
      text: '#ffffff',
      background: '#121213',
      surface: '#1e1e1e',
      textSecondary: '#9ca3af'
    }
  }
} as const

// Legacy colors for backward compatibility
export const COLORS = COLOR_PALETTES.light.normal

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
