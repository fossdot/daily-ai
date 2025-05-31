import { NextResponse } from 'next/server'
import { fetchAINews } from '@/services/newsService'

// This should be stored in a database in a real application
const SUBSCRIBED_EMAILS = process.env.SUBSCRIBER_EMAILS?.split(',') || []

export async function GET(request: Request) {
  try {
    // Verify the request is from a legitimate cron job
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Fetch the latest AI news
    const articles = await fetchAINews('All', 'day')
    
    // Return the articles as JSON
    return NextResponse.json({
      status: 'success',
      articles: articles.slice(0, 3) // Return top 3 articles
    })
  } catch (error) {
    console.error('Error in daily digest API:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 