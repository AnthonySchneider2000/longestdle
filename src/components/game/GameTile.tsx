'use client'

import { motion } from 'framer-motion'
import { LetterStatus } from '@/types/game'

interface GameTileProps {
  letter: string
  status: LetterStatus
  animationDelay?: number
  isRevealing?: boolean
}

export function GameTile({ letter, status, animationDelay = 0, isRevealing = false }: GameTileProps) {
  const getBackgroundColor = () => {
    switch (status) {
      case 'correct': return 'var(--color-correct)'
      case 'present': return 'var(--color-present)'
      case 'absent': return 'var(--color-absent)'
      default: return 'var(--color-empty)'
    }
  }

  const getBorderColor = () => {
    return status === 'empty' ? 'var(--color-border)' : getBackgroundColor()
  }

  const getTextColor = () => {
    return status === 'empty' ? 'var(--color-text)' : '#ffffff'
  }

  return (
    <motion.div
      className="game-tile relative w-full aspect-square border flex items-center justify-center font-bold select-none text-[0.3rem] xs:text-[0.4rem] sm:text-[0.5rem] md:text-[0.6rem] lg:text-xs xl:text-sm 2xl:text-base"
      style={{
        backgroundColor: getBackgroundColor(),
        borderColor: getBorderColor(),
        color: getTextColor(),
        minWidth: '4px',
        minHeight: '4px'
      }}
      initial={false}
      animate={
        isRevealing
          ? {
              rotateX: [0, 90, 0],
              backgroundColor: ['var(--color-empty)', 'var(--color-empty)', getBackgroundColor()],
              borderColor: ['var(--color-border)', 'var(--color-border)', getBorderColor()],
              color: ['var(--color-text)', 'var(--color-text)', getTextColor()]
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
