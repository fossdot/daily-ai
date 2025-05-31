# AI Pulse - Stay Updated with AI News

AI Pulse is a modern web application that helps you stay up-to-date with the latest artificial intelligence news, developments, and trends. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Real-time AI news aggregation
- Filter news by category (Research, Industry, Applications, Ethics, Policy)
- Time-based filtering (24 hours, week, month)
- Clean and responsive user interface
- Daily email digests of breaking AI news
- Powered by NewsAPI

## Prerequisites

- Node.js 18.0.0 or later
- Yarn package manager
- NewsAPI key (get one at [https://newsapi.org](https://newsapi.org))
- SendGrid account for email sending (get one at [https://sendgrid.com](https://sendgrid.com))

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-pulse.git
   cd ai-pulse
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # NewsAPI key for fetching AI news
   NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key_here

   # SendGrid configuration for email sending
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   SENDGRID_FROM_EMAIL=your_verified_sender_email@example.com

   # Comma-separated list of email subscribers
   SUBSCRIBER_EMAILS=your_email@example.com

   # Secret key for cron job authentication
   CRON_SECRET_KEY=your_secret_key_here
   ```

4. Set up a daily cron job to trigger the email digest. You can use services like [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs) or any other cron service. The cron job should make a GET request to:
   ```
   https://your-domain.com/api/cron/daily-digest
   ```
   Include the following header:
   ```
   Authorization: Bearer your_cron_secret_key_here
   ```

5. Run the development server:
   ```bash
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Email Digests

The application sends daily email digests containing:
- Breaking or major AI news developments
- Limited to 3 most important articles
- Includes source attribution
- Sent to all subscribed email addresses

To add or remove email subscribers, update the `SUBSCRIBER_EMAILS` environment variable.

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [NewsAPI](https://newsapi.org/) - News data provider
- [SendGrid](https://sendgrid.com/) - Email service
- [date-fns](https://date-fns.org/) - Date formatting
- [Heroicons](https://heroicons.com/) - Icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
