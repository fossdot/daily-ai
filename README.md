# Daily AI

A simple AI news aggregator built with Next.js and developed using Cursor AI.

## Features

- Browse AI-related news
- Filter by category
- Filter by time period
- Responsive design

## Prerequisites

- Node.js 18.0.0 or later
- Yarn package manager
- NewsAPI key (get one at [https://newsapi.org](https://newsapi.org))

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/daily-ai.git
   cd daily-ai
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create a `.env.local` file in the root directory with:
   ```
   NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
   ```

4. Run the development server:
   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technology Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NewsAPI](https://newsapi.org/)
- [date-fns](https://date-fns.org/)
- [Heroicons](https://heroicons.com/)


## License

MIT License
