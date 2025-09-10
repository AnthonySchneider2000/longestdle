'use client'

import { motion } from 'framer-motion'
import { LetterStatus } from '@/types/game'
import { COLORS } from '@/lib/constants'

interface GameTileProps {
  letter: string
  status: LetterStatus
  animationDelay?: number
  isRevealing?: boolean
}

export function GameTile({ letter, status, animationDelay = 0, isRevealing = false }: GameTileProps) {
  const getBackgroundColor = () => {
    switch (status) {
      case 'correct': return COLORS.correct
      case 'present': return COLORS.present
      case 'absent': return COLORS.absent
      default: return COLORS.empty
    }
  }

  const getBorderColor = () => {
    return status === 'empty' ? COLORS.border : getBackgroundColor()
  }

  const getTextColor = () => {
    return status === 'empty' ? COLORS.text : '#ffffff'
  }

  return (
    <motion.div
      className="relative w-full aspect-square border-2 flex items-center justify-center font-bold select-none text-[0.4rem] xs:text-[0.5rem] sm:text-[0.6rem] md:text-xs lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl"
      style={{
        backgroundColor: getBackgroundColor(),
        borderColor: getBorderColor(),
        color: getTextColor(),
        minWidth: '8px',
        minHeight: '8px'
      }}
      initial={false}
      animate={
        isRevealing
          ? {
              rotateX: [0, 90, 0],
              backgroundColor: [COLORS.empty, COLORS.empty, getBackgroundColor()],
              borderColor: [COLORS.border, COLORS.border, getBorderColor()],
              color: [COLORS.text, COLORS.text, getTextColor()]
            }
          : {}
      }
      transition={{
        duration: 0.6,
        delay: animationDelay,
        ease: 'easeInOut'
      }}
    >
      <motion.span
        animate={
          isRevealing
            ? {
                rotateX: [0, 90, 0]
              }
            : {}
        }
        transition={{
          duration: 0.6,
          delay: animationDelay,
          ease: 'easeInOut'
        }}
      >
        {letter}
      </motion.span>
    </motion.div>
  )
}
