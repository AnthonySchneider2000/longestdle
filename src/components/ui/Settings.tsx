'use client'

import { useThemeContext } from '@/components/providers/ThemeProvider'
import { ColorBlindMode } from '@/types/game'

export function Settings() {
  const { 
    themeSettings, 
    toggleDarkMode, 
    setColorBlindMode, 
    resetTheme,
    isDarkMode,
    isColorBlindMode
  } = useThemeContext()

  const colorBlindOptions: { value: ColorBlindMode; label: string; description: string }[] = [
    { value: 'normal', label: 'Normal', description: 'Standard colors' },
    { value: 'protanopia', label: 'Protanopia', description: 'Red-blind friendly' },
    { value: 'deuteranopia', label: 'Deuteranopia', description: 'Green-blind friendly' },
    { value: 'tritanopia', label: 'Tritanopia', description: 'Blue-blind friendly' }
  ]

  return (
    <div className="space-y-6">
      {/* Theme Mode */}
      <div>
        <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text)' }}>Appearance</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium" style={{ color: 'var(--color-text)' }}>Dark Mode</div>
              <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Switch between light and dark themes
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Color Blind Mode */}
      <div>
        <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text)' }}>Accessibility</h3>
        <div>
          <div className="font-medium mb-2" style={{ color: 'var(--color-text)' }}>Color Blind Support</div>
          <div className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
            Choose colors optimized for different types of color vision
          </div>
          <div className="space-y-2">
            {colorBlindOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:opacity-70 transition-opacity"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="colorBlindMode"
                    value={option.value}
                    checked={themeSettings.colorBlindMode === option.value}
                    onChange={() => setColorBlindMode(option.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div>
                    <div className="font-medium" style={{ color: 'var(--color-text)' }}>{option.label}</div>
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{option.description}</div>
                  </div>
                </div>
                {themeSettings.colorBlindMode === option.value && (
                  <div className="text-blue-600 text-sm font-medium">Active</div>
                )}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Color Preview */}
      <div>
        <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text)' }}>Color Preview</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div 
              className="w-12 h-12 rounded mx-auto mb-1"
              style={{ backgroundColor: 'var(--color-correct)' }}
            />
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Correct</div>
          </div>
          <div className="text-center">
            <div 
              className="w-12 h-12 rounded mx-auto mb-1"
              style={{ backgroundColor: 'var(--color-present)' }}
            />
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Present</div>
          </div>
          <div className="text-center">
            <div 
              className="w-12 h-12 rounded mx-auto mb-1"
              style={{ backgroundColor: 'var(--color-absent)' }}
            />
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Absent</div>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <button
          onClick={resetTheme}
          className="w-full px-4 py-2 text-sm font-medium rounded-lg transition-opacity hover:opacity-70"
          style={{ 
            color: 'var(--color-text)', 
            backgroundColor: 'var(--color-empty)',
            border: `1px solid var(--color-border)`
          }}
        >
          Reset to Default Settings
        </button>
      </div>
    </div>
  )
}
