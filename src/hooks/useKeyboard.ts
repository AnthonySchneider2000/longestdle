import { useEffect } from 'react'

interface UseKeyboardProps {
  onKeyPress: (key: string) => void
  onEnter: () => void
  onBackspace: () => void
  disabled?: boolean
}

export function useKeyboard({ onKeyPress, onEnter, onBackspace, disabled }: UseKeyboardProps) {
  useEffect(() => {
    if (disabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase()
      
      // Prevent default behavior for game keys
      if (/^[A-Z]$/.test(key) || key === 'ENTER' || key === 'BACKSPACE') {
        event.preventDefault()
      }
      
      if (/^[A-Z]$/.test(key)) {
        onKeyPress(key)
      } else if (key === 'ENTER') {
        onEnter()
      } else if (key === 'BACKSPACE') {
        onBackspace()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onKeyPress, onEnter, onBackspace, disabled])
}
