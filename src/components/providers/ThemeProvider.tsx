'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { ThemeMode, ColorBlindMode } from '@/types/game'

interface ThemeContextType {
  themeSettings: { mode: ThemeMode; colorBlindMode: ColorBlindMode }
  currentPalette: any
  toggleDarkMode: () => void
  setColorBlindMode: (mode: ColorBlindMode) => void
  resetTheme: () => void
  isDarkMode: boolean
  isColorBlindMode: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeHook = useTheme()

  return (
    <ThemeContext.Provider
      value={themeHook}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}
