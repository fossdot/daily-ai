# Daily AI

A simple AI news aggregator built with Next.js and developed using Cursor AI.

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/fossdot/daily-ai.git
   cd daily-ai
   ```

2. **Install Node.js**
   - Required version: 18.0.0 or later
   - Download from [nodejs.org](https://nodejs.org)

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   - Create a `.env.local` file in the root directory
   - Get your API key from [NewsAPI](https://newsapi.org)
   - Add this line to `.env.local`:
     ```
     NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
     ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **View the app**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - The page will auto-update as you edit files

## Features

- Browse AI-related news
- Filter by category
- Filter by time period
- Responsive design

## Technology Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NewsAPI](https://newsapi.org/)
- [date-fns](https://date-fns.org/)
- [Heroicons](https://heroicons.com/)

## License

MIT License
