# Longestdle 🎯

A challenging word-guessing game based on Wordle, but with a twist - you have to guess the longest word in the English dictionary: **pneumonoultramicroscopicsilicovolcanoconiosis** (45 letters)!

## 🎮 About the Game

Longestdle is inspired by the popular Wordle game but takes it to the extreme. Instead of guessing a 5-letter word, players must figure out the 45-letter medical term "pneumonoultramicroscopicsilicovolcanoconiosis" - a lung disease caused by inhaling very fine silicate or quartz dust.

## ✨ Features

- **6 Attempts**: You have 6 tries to guess the complete 45-letter word
- **Color-Coded Feedback**: 
  - 🟢 **Green**: Letter is correct and in the right position
  - 🟡 **Yellow**: Letter is in the word but in wrong position
  - ⬜ **Gray**: Letter is not in the word at all
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop
- **Game Statistics**: Track your wins, streaks, and guess distribution
- **Share Results**: Share your success (or failure) with friends
- **Local Storage**: Your game progress is saved locally
- **Smooth Animations**: Beautiful reveal animations powered by Framer Motion

## 🚀 Tech Stack

- **[Next.js 15.5.2](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - UI library
- **[TypeScript](https://typescriptlang.org)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[Framer Motion](https://framer.com/motion)** - Animation library
- **[Lucide React](https://lucide.dev)** - Icon library

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd longestdle
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 How to Play

1. **Start Guessing**: Type letters using your keyboard or the on-screen keyboard
2. **Submit**: Press Enter when you've entered all 45 letters
3. **Learn**: Pay attention to the color feedback:
   - Green tiles show correct letters in correct positions
   - Yellow tiles show correct letters in wrong positions
   - Gray tiles show letters not in the word
4. **Strategize**: Use the feedback to make better guesses
5. **Win**: Guess the complete word within 6 attempts!

### The Target Word

**pneumonoultramicroscopicsilicovolcanoconiosis**

*A lung disease caused by the inhalation of very fine silicate or quartz dust, found especially in volcanos. It's commonly cited as the longest word in major English dictionaries.*

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── game/              # Game-related components
│   │   ├── GameBoard.tsx  # Main game grid
│   │   ├── GameRow.tsx    # Individual game rows
│   │   ├── GameTile.tsx   # Letter tiles
│   │   └── Keyboard.tsx   # Virtual keyboard
│   └── ui/                # UI components
│       ├── Header.tsx     # App header
│       └── Modal.tsx      # Modal dialogs
├── hooks/                 # Custom React hooks
│   ├── useGameState.ts    # Game state management
│   ├── useKeyboard.ts     # Keyboard input handling
│   └── useLocalStorage.ts # Local storage utilities
├── lib/                   # Utility functions
│   ├── constants.ts       # Game constants
│   └── gameLogic.ts       # Core game logic
└── types/                 # TypeScript type definitions
    └── game.ts           # Game-related types
```

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Deploy automatically with every push

### Other Platforms

This app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS
- Google Cloud Platform

## 📄 License

This project currently has no license specified.

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

1. **Report Bugs**: Found a bug? Please open an issue
2. **Suggest Features**: Have an idea? We'd love to hear it
3. **Submit PRs**: Fix bugs or add features with pull requests
4. **Improve Docs**: Help make the documentation better

### Development Guidelines

- Follow the existing code style
- Write TypeScript with proper types
- Ensure all ESLint rules pass
- Test your changes thoroughly
- Write meaningful commit messages using conventional commits

## 🎉 Acknowledgments

- Inspired by [Wordle](https://www.nytimes.com/games/wordle/index.html) by Josh Wardle
- Built with the amazing Next.js framework
- Icons by Lucide React
- Animations by Framer Motion

---

**Challenge yourself with the longest word game!** 🧠✨
