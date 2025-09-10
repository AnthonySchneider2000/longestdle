'use client'

import { useState } from 'react'
import { Header } from '@/components/ui/Header'
import { Modal } from '@/components/ui/Modal'
import { GameBoard } from '@/components/game/GameBoard'
import { Keyboard } from '@/components/game/Keyboard'
import { useGameState } from '@/hooks/useGameState'
import { useKeyboard } from '@/hooks/useKeyboard'
import { generateShareText } from '@/lib/gameLogic'
import { TARGET_WORD } from '@/lib/constants'

export default function Home() {
  const {
    gameState,
    gameStats,
    addLetter,
    removeLetter,
    submitGuess,
    resetGame,
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
      } catch (error) {
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
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        onHowToPlay={() => setShowHowToPlay(true)}
        onStats={() => setShowStats(true)}
        onSettings={() => setShowSettings(true)}
        onShare={handleShare}
      />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-full mx-auto w-full">
        <div className="w-full mb-8">
          <GameBoard gameState={gameState} />
        </div>

        {gameState.gameStatus !== 'playing' && (
          <div className="text-center mb-6 p-4 bg-gray-100 rounded-lg">
            {gameState.gameStatus === 'won' ? (
              <div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">Congratulations! 🎉</h2>
                <p className="text-gray-700">
                  You guessed <strong>pneumonoultramicroscopicsilicovolcanoconiosis</strong> in {gameState.currentRow} {gameState.currentRow === 1 ? 'try' : 'tries'}!
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">Game Over 😔</h2>
                <p className="text-gray-700">
                  The word was <strong>pneumonoultramicroscopicsilicovolcanoconiosis</strong>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  (It's a lung disease caused by inhaling very fine silicate or quartz dust)
                </p>
              </div>
            )}
            <button
              onClick={resetGame}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Play Again
            </button>
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
          <p>Guess the 45-letter word in 6 tries.</p>
          <p>Each guess must be exactly 45 letters long.</p>
          <div className="space-y-2">
            <p><strong>Color coding:</strong></p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold">A</div>
              <span>Letter is in the word and in the correct spot</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-white font-bold">B</div>
              <span>Letter is in the word but in the wrong spot</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-500 rounded flex items-center justify-center text-white font-bold">C</div>
              <span>Letter is not in the word</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">
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
              <div className="text-2xl font-bold">{gameStats.gamesPlayed}</div>
              <div className="text-sm text-gray-600">Played</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{getWinPercentage()}</div>
              <div className="text-sm text-gray-600">Win %</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{gameStats.currentStreak}</div>
              <div className="text-sm text-gray-600">Current Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{gameStats.maxStreak}</div>
              <div className="text-sm text-gray-600">Max Streak</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">Guess Distribution</h3>
            <div className="space-y-1">
              {[1, 2, 3, 4, 5, 6].map(i => {
                const count = gameStats.guessDistribution[i] || 0
                const maxCount = Math.max(...Object.values(gameStats.guessDistribution))
                const width = maxCount > 0 ? (count / maxCount) * 100 : 0
                
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-4 text-sm">{i}</span>
                    <div className="flex-1 bg-gray-200 h-6 rounded">
                      <div 
                        className="bg-green-500 h-full rounded text-white text-xs flex items-center justify-end pr-2"
                        style={{ width: `${Math.max(width, count > 0 ? 10 : 0)}%` }}
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
        <div className="space-y-4">
          <p>Settings coming soon!</p>
          <p className="text-sm text-gray-600">
            Future features: Dark mode, color blind mode, and more!
          </p>
        </div>
      </Modal>
    </div>
  )
}
