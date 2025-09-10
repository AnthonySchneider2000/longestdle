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
    <div className="w-full max-w-full mx-auto px-1 sm:px-2">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-[2px] xs:gap-1 sm:gap-2 mb-1 xs:mb-2">
          {row.map((key) => {
            const isSpecialKey = key === 'ENTER' || key === 'BACKSPACE'
            const style = getKeyStyle(key)
            
            return (
              <motion.button
                key={key}
                className={`
                  keyboard-key ${isSpecialKey ? 'keyboard-key-special' : ''}
                  rounded font-bold 
                  flex items-center justify-center
                  transition-all duration-150
                  active:scale-95
                  text-[10px] xs:text-xs sm:text-sm md:text-base
                  min-w-[28px] xs:min-w-[32px] sm:min-w-[40px] md:min-w-[48px]
                  ${isSpecialKey ? 'min-w-[42px] xs:min-w-[48px] sm:min-w-[60px] md:min-w-[72px]' : ''}
                  px-1 xs:px-2 sm:px-3
                  py-2 xs:py-3
                  h-8 xs:h-10 sm:h-12 md:h-14
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
                  <Delete className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                ) : key === 'ENTER' ? (
                  <CornerDownLeft className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
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
