'use client'

import { useState } from 'react'
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
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={onHowToPlay}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle size={20} />
            </motion.button>
          </div>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Longestdle
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              The 45-letter word game
            </p>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={onShare}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={20} />
            </motion.button>
            <motion.button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={onStats}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 size={20} />
            </motion.button>
            <motion.button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
