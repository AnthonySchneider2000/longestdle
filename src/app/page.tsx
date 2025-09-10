'use client'

import { useState } from 'react'
import { Header } from '@/components/ui/Header'
import { Modal } from '@/components/ui/Modal'
import { Settings } from '@/components/ui/Settings'
import { GameBoard } from '@/components/game/GameBoard'
import { Keyboard } from '@/components/game/Keyboard'
import { useGameState } from '@/hooks/useGameState'
import { useKeyboard } from '@/hooks/useKeyboard'
import { generateShareText } from '@/lib/gameLogic'

export default function Home() {
  const {
    gameState,
    gameStats,
    addLetter,
    removeLetter,
    submitGuess,
    getKeyboardLetterStatus,
    canSubmit,
    canAddLetter,
    canRemoveLetter
  } = useGameState()

  const [showHowToPlay, setShowHowToPlay] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useKeyboard({
    onKeyPress: addLetter,
    onEnter: submitGuess,
    onBackspace: removeLetter,
    disabled: gameState.gameStatus !== 'playing'
  })

  const handleShare = async () => {
    const shareText = generateShareText(gameState)
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Longestdle',
          text: shareText
        })
      } catch {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareText)
        alert('Results copied to clipboard!')
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(shareText)
      alert('Results copied to clipboard!')
    }
  }

  const getWinPercentage = () => {
    if (gameStats.gamesPlayed === 0) return 0
    return Math.round((gameStats.gamesWon / gameStats.gamesPlayed) * 100)
  }

  return (
    <div 
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Header
        onHowToPlay={() => setShowHowToPlay(true)}
        onStats={() => setShowStats(true)}
        onSettings={() => setShowSettings(true)}
        onShare={handleShare}
      />

      <main className="flex-1 flex flex-col items-center justify-between py-4 max-w-full mx-auto w-full min-h-0">
        <div className="w-full flex-1 flex items-center justify-center min-h-0">
          <GameBoard gameState={gameState} />
        </div>

        {gameState.gameStatus !== 'playing' && (
          <div 
            className="text-center mb-6 p-4 rounded-lg"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            {gameState.gameStatus === 'won' ? (
              <div>
                <h2 
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--color-correct)' }}
                >
                  Congratulations! 🎉
                </h2>
                <p style={{ color: 'var(--color-text)' }}>
                  You guessed <strong>pneumonoultramicroscopicsilicovolcanoconiosis</strong> in {gameState.currentRow} {gameState.currentRow === 1 ? 'try' : 'tries'}!
                </p>
              </div>
            ) : (
              <div>
                <h2 
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--color-absent)' }}
                >
                  Game Over 😔
                </h2>
                <p style={{ color: 'var(--color-text)' }}>
                  The word was <strong>pneumonoultramicroscopicsilicovolcanoconiosis</strong>
                </p>
                <p 
                  className="text-sm mt-2"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  (It&apos;s a lung disease caused by inhaling very fine silicate or quartz dust)
                </p>
              </div>
            )}
          </div>
        )}

        <div className="w-full">
          <Keyboard
            onKeyPress={addLetter}
            onEnter={submitGuess}
            onBackspace={removeLetter}
            getLetterStatus={getKeyboardLetterStatus}
            canSubmit={canSubmit}
            canAddLetter={canAddLetter}
            canRemoveLetter={canRemoveLetter}
          />
        </div>
      </main>

      {/* How to Play Modal */}
      <Modal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
        title="How to Play"
      >
        <div className="space-y-4">
          <p style={{ color: 'var(--color-text)' }}>Guess the 45-letter word in 6 tries.</p>
          <p style={{ color: 'var(--color-text)' }}>Each guess must be exactly 45 letters long.</p>
          <div className="space-y-2">
            <p style={{ color: 'var(--color-text)' }}><strong>Color coding:</strong></p>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: 'var(--color-correct)' }}
              >
                A
              </div>
              <span style={{ color: 'var(--color-text)' }}>Letter is in the word and in the correct spot</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: 'var(--color-present)' }}
              >
                B
              </div>
              <span style={{ color: 'var(--color-text)' }}>Letter is in the word but in the wrong spot</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: 'var(--color-absent)' }}
              >
                C
              </div>
              <span style={{ color: 'var(--color-text)' }}>Letter is not in the word</span>
            </div>
          </div>
          <p 
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <strong>Hint:</strong> The word is the longest word in most English dictionaries and refers to a lung disease!
          </p>
        </div>
      </Modal>

      {/* Stats Modal */}
      <Modal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        title="Statistics"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div 
                className="text-2xl font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                {gameStats.gamesPlayed}
              </div>
              <div 
                className="text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Played
              </div>
            </div>
            <div>
              <div 
                className="text-2xl font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                {getWinPercentage()}
              </div>
              <div 
                className="text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Win %
              </div>
            </div>
            <div>
              <div 
                className="text-2xl font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                {gameStats.currentStreak}
              </div>
              <div 
                className="text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Current Streak
              </div>
            </div>
            <div>
              <div 
                className="text-2xl font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                {gameStats.maxStreak}
              </div>
              <div 
                className="text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Max Streak
              </div>
            </div>
          </div>
          
          <div>
            <h3 
              className="font-bold mb-2"
              style={{ color: 'var(--color-text)' }}
            >
              Guess Distribution
            </h3>
            <div className="space-y-1">
              {[1, 2, 3, 4, 5, 6].map(i => {
                const count = gameStats.guessDistribution[i] || 0
                const maxCount = Math.max(...Object.values(gameStats.guessDistribution))
                const width = maxCount > 0 ? (count / maxCount) * 100 : 0
                
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span 
                      className="w-4 text-sm"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {i}
                    </span>
                    <div 
                      className="flex-1 h-6 rounded"
                      style={{ backgroundColor: 'var(--color-empty)' }}
                    >
                      <div 
                        className="h-full rounded text-white text-xs flex items-center justify-end pr-2"
                        style={{ 
                          backgroundColor: 'var(--color-correct)',
                          width: `${Math.max(width, count > 0 ? 10 : 0)}%`
                        }}
                      >
                        {count > 0 && count}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Settings"
      >
        <Settings />
      </Modal>
    </div>
  )
}
