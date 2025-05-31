import sgMail from '@sendgrid/mail'
import { fetchAINews } from './newsService'
import type { Article } from 'newsapi'

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

function isBreakingNews(article: Article): boolean {
  const title = article.title.toLowerCase()
  const description = article.description?.toLowerCase() || ''
  
  // Keywords that might indicate important news
  const importantKeywords = [
    'breakthrough',
    'breaking',
    'announces',
    'launches',
    'major',
    'revolutionary',
    'milestone',
    'first ever',
    'exclusive'
  ]

  return importantKeywords.some(keyword => 
    title.includes(keyword) || description.includes(keyword)
  )
}

function summarizeArticles(articles: Article[]): string {
  const importantArticles = articles
    .filter(isBreakingNews)
    .slice(0, 3) // Limit to top 3 important articles

  if (importantArticles.length === 0) {
    return 'No major AI news developments today.'
  }

  return importantArticles
    .map(article => {
      const title = article.title
      const source = article.source.name
      return `${title} (via ${source})`
    })
    .join('\n\n')
}

export async function sendDailyDigest(recipientEmail: string) {
  try {
    // Fetch last 24 hours of news
    const articles = await fetchAINews('All', 'day')
    const summary = summarizeArticles(articles)
    
    const msg = {
      to: recipientEmail,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@aipulse.com',
      subject: 'Your Daily AI News Digest',
      text: summary,
      html: summary.replace(/\n/g, '<br>'),
    }

    await sgMail.send(msg)
    console.log('Daily digest email sent successfully')
  } catch (error) {
    console.error('Error sending daily digest:', error)
    throw error
  }
} 