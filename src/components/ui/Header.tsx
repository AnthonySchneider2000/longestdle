'use client'

import { HelpCircle, BarChart3, Settings, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeaderProps {
  onHowToPlay?: () => void
  onStats?: () => void
  onSettings?: () => void
  onShare?: () => void
}

export function Header({ onHowToPlay, onStats, onSettings, onShare }: HeaderProps) {
  return (
    <header 
      className="w-full border-b"
      style={{ 
        borderColor: 'var(--color-border)', 
        backgroundColor: 'var(--color-surface)' 
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.button
              className="p-2 hover:opacity-70 rounded-full transition-opacity"
              style={{ color: 'var(--color-text)' }}
              onClick={onHowToPlay}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle size={20} />
            </motion.button>
          </div>

          <div className="text-center">
            <h1 
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: 'var(--color-text)' }}
            >
              Longestdle
            </h1>
            <p 
              className="text-xs sm:text-sm mt-1"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              The 45-letter word game
            </p>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              className="p-2 hover:opacity-70 rounded-full transition-opacity"
              style={{ color: 'var(--color-text)' }}
              onClick={onShare}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={20} />
            </motion.button>
            <motion.button
              className="p-2 hover:opacity-70 rounded-full transition-opacity"
              style={{ color: 'var(--color-text)' }}
              onClick={onStats}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 size={20} />
            </motion.button>
            <motion.button
              className="p-2 hover:opacity-70 rounded-full transition-opacity"
              style={{ color: 'var(--color-text)' }}
              onClick={onSettings}
              whileTap={{ scale: 0.95 }}
            >
              <Settings size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  )
}
