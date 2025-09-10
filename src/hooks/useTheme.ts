import { useCallback, useEffect, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { ThemeSettings, ColorPalette } from '@/types/game'
import { COLOR_PALETTES, STORAGE_KEYS } from '@/lib/constants'

const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  mode: 'light',
  colorBlindMode: 'normal'
}

export function useTheme() {
  const [themeSettings, setThemeSettings] = useLocalStorage<ThemeSettings>(
    STORAGE_KEYS.theme,
    DEFAULT_THEME_SETTINGS
  )

  const [currentPalette, setCurrentPalette] = useState<ColorPalette>(
    COLOR_PALETTES[themeSettings.mode][themeSettings.colorBlindMode]
  )

  // Update palette when theme settings change
  useEffect(() => {
    const newPalette = COLOR_PALETTES[themeSettings.mode][themeSettings.colorBlindMode]
    setCurrentPalette(newPalette)
    
    // Apply CSS custom properties for theme switching
    const root = document.documentElement
    root.style.setProperty('--color-correct', newPalette.correct)
    root.style.setProperty('--color-present', newPalette.present)
    root.style.setProperty('--color-absent', newPalette.absent)
    root.style.setProperty('--color-empty', newPalette.empty)
    root.style.setProperty('--color-border', newPalette.border)
    root.style.setProperty('--color-text', newPalette.text)
    root.style.setProperty('--color-background', newPalette.background)
    root.style.setProperty('--color-surface', newPalette.surface)
    root.style.setProperty('--color-text-secondary', newPalette.textSecondary)
    
    // Apply dark class to html element for Tailwind dark mode
    if (themeSettings.mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [themeSettings])

  const toggleDarkMode = useCallback(() => {
    setThemeSettings(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light'
    }))
  }, [setThemeSettings])

  const setColorBlindMode = useCallback((colorBlindMode: ThemeSettings['colorBlindMode']) => {
    setThemeSettings(prev => ({
      ...prev,
      colorBlindMode
    }))
  }, [setThemeSettings])

  const resetTheme = useCallback(() => {
    setThemeSettings(DEFAULT_THEME_SETTINGS)
  }, [setThemeSettings])

  return {
    themeSettings,
    currentPalette,
    toggleDarkMode,
    setColorBlindMode,
    resetTheme,
    isDarkMode: themeSettings.mode === 'dark',
    isColorBlindMode: themeSettings.colorBlindMode !== 'normal'
  }
}
