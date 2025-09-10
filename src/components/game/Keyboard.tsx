'use client'

import { motion } from 'framer-motion'
import { Delete, CornerDownLeft } from 'lucide-react'
import { LetterStatus } from '@/types/game'
import { KEYBOARD_ROWS, COLORS } from '@/lib/constants'

interface KeyboardProps {
  onKeyPress: (key: string) => void
  onEnter: () => void
  onBackspace: () => void
  getLetterStatus: (letter: string) => LetterStatus
  canSubmit: boolean
  canAddLetter: boolean
  canRemoveLetter: boolean
}

export function Keyboard({ 
  onKeyPress, 
  onEnter, 
  onBackspace, 
  getLetterStatus,
  canSubmit,
  canAddLetter,
  canRemoveLetter
}: KeyboardProps) {
  const getKeyStyle = (key: string) => {
    if (key === 'ENTER' || key === 'BACKSPACE') {
      return {
        backgroundColor: COLORS.border,
        color: COLORS.text,
        opacity: (key === 'ENTER' && !canSubmit) || (key === 'BACKSPACE' && !canRemoveLetter) ? 0.5 : 1
      }
    }

    const status = getLetterStatus(key)
    switch (status) {
      case 'correct':
        return { backgroundColor: COLORS.correct, color: '#ffffff' }
      case 'present':
        return { backgroundColor: COLORS.present, color: '#ffffff' }
      case 'absent':
        return { backgroundColor: COLORS.absent, color: '#ffffff' }
      default:
        return { 
          backgroundColor: COLORS.border, 
          color: COLORS.text,
          opacity: !canAddLetter ? 0.5 : 1
        }
    }
  }

  const handleKeyClick = (key: string) => {
    if (key === 'ENTER') {
      if (canSubmit) onEnter()
    } else if (key === 'BACKSPACE') {
      if (canRemoveLetter) onBackspace()
    } else {
      if (canAddLetter) onKeyPress(key)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 mb-2">
          {row.map((key) => {
            const isSpecialKey = key === 'ENTER' || key === 'BACKSPACE'
            const style = getKeyStyle(key)
            
            return (
              <motion.button
                key={key}
                className={`
                  ${isSpecialKey ? 'px-3 min-w-[60px]' : 'px-2 min-w-[40px]'} 
                  py-3 rounded font-bold text-sm sm:text-base
                  flex items-center justify-center
                  transition-all duration-150
                  active:scale-95
                `}
                style={style}
                onClick={() => handleKeyClick(key)}
                whileTap={{ scale: 0.95 }}
                disabled={
                  (key === 'ENTER' && !canSubmit) ||
                  (key === 'BACKSPACE' && !canRemoveLetter) ||
                  (key !== 'ENTER' && key !== 'BACKSPACE' && !canAddLetter)
                }
              >
                {key === 'BACKSPACE' ? (
                  <Delete size={18} />
                ) : key === 'ENTER' ? (
                  <CornerDownLeft size={18} />
                ) : (
                  key
                )}
              </motion.button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
