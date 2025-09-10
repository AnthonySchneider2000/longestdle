'use client'

import { useState, useEffect } from 'react'
import { GameRow } from './GameRow'
import { GameState } from '@/types/game'
import { MAX_GUESSES, WORD_LENGTH } from '@/lib/constants'

interface GameBoardProps {
  gameState: GameState
  onInvalidGuess?: () => void
}

export function GameBoard({ gameState, onInvalidGuess }: GameBoardProps) {
  const [revealingRow, setRevealingRow] = useState<number | null>(null)
  const [shakingRow, setShakingRow] = useState<number | null>(null)

  // Handle row reveal animation when a guess is submitted
  useEffect(() => {
    if (gameState.currentRow > 0) {
      const lastSubmittedRow = gameState.currentRow - 1
      if (gameState.guesses[lastSubmittedRow]?.length === WORD_LENGTH) {
        setRevealingRow(lastSubmittedRow)
        
        // Clear revealing state after animation completes
        const timer = setTimeout(() => {
          setRevealingRow(null)
        }, WORD_LENGTH * 100 + 600) // Total animation time
        
        return () => clearTimeout(timer)
      }
    }
  }, [gameState.currentRow, gameState.guesses])

  // Handle shake animation for invalid guesses
  const triggerShake = () => {
    setShakingRow(gameState.currentRow)
    const timer = setTimeout(() => {
      setShakingRow(null)
    }, 500)
    return () => clearTimeout(timer)
  }

  // Trigger shake when invalid guess is attempted
  useEffect(() => {
    if (onInvalidGuess) {
      // This would be called from parent when invalid guess is detected
    }
  }, [onInvalidGuess])

  const rows = []
  for (let i = 0; i < MAX_GUESSES; i++) {
    const guess = gameState.guesses[i] || ''
    const isSubmitted = i < gameState.currentRow
    const isCurrentRow = i === gameState.currentRow
    const isRevealing = revealingRow === i
    const shake = shakingRow === i

    rows.push(
      <GameRow
        key={i}
        guess={guess}
        isSubmitted={isSubmitted}
        isCurrentRow={isCurrentRow}
        isRevealing={isRevealing}
        shake={shake}
      />
    )
  }

  return (
    <div className="w-full h-full flex items-center overflow-hidden sm:px-2">
      <div 
        className="grid gap-[1px] xs:gap-[2px] sm:gap-1 md:gap-2 lg:gap-3 w-full"
        style={{
          gridTemplateRows: `repeat(${MAX_GUESSES}, 1fr)`,
          height: `min(60vh, ${100 / WORD_LENGTH * MAX_GUESSES}vw)`
        }}
      >
        {rows}
      </div>
    </div>
  )
}
