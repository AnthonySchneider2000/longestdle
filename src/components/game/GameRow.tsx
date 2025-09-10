'use client'

import { motion } from 'framer-motion'
import { GameTile } from './GameTile'
import { checkGuess } from '@/lib/gameLogic'
import { WORD_LENGTH, ANIMATIONS } from '@/lib/constants'

interface GameRowProps {
  guess: string
  isSubmitted: boolean
  isCurrentRow: boolean
  isRevealing: boolean
  shake?: boolean
}

export function GameRow({ guess, isSubmitted, isRevealing, shake = false }: GameRowProps) {
  const tiles = []
  const letterStatuses = isSubmitted ? checkGuess(guess) : []

  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = guess[i] || ''
    const status = isSubmitted ? letterStatuses[i] : 'empty'
    const animationDelay = isRevealing ? i * ANIMATIONS.flipDelay : 0

    tiles.push(
      <GameTile
        key={i}
        letter={letter}
        status={status}
        animationDelay={animationDelay}
        isRevealing={isRevealing}
      />
    )
  }

  return (
    <motion.div
      className="grid w-full gap-[1px] xs:gap-[2px] sm:gap-1 md:gap-2"
      style={{
        gridTemplateColumns: `repeat(${WORD_LENGTH}, 1fr)`,
        height: '100%'
      }}
      animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
      transition={{
        duration: 0.5,
        ease: 'easeInOut'
      }}
    >
      {tiles}
    </motion.div>
  )
}
