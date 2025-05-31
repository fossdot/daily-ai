import { format } from 'date-fns'
import type { Article } from '../types'

interface DailySummaryProps {
  date: string
  articles: Article[]
}

function summarizeArticles(articles: Article[]): string {
  // Extract key topics and themes from the articles
  const topics = new Map<string, number>() // Track topic frequency
  
  articles.forEach(article => {
    if (!article?.title) return
    
    const title = article.title.toLowerCase()
    const description = article.description?.toLowerCase() || ''
    
    // Define key AI-related topics to look for
    const keyTopics = [
      'artificial intelligence',
      'machine learning',
      'deep learning',
      'ai model',
      'neural network',
      'chatgpt',
      'llm',
      'automation',
      'robotics'
    ]

    // Extract meaningful phrases and count their frequency
    keyTopics.forEach(topic => {
      if (title.includes(topic) || description.includes(topic)) {
        // Look for the main subject after the AI-related term
        const afterTopic = (title + ' ' + description).split(topic)[1]
        if (afterTopic) {
          // Extract the first meaningful phrase after the topic
          const phrase = afterTopic
            .split(/[.!?;]/)
            [0]
            .split(' ')
            .slice(0, 6)
            .join(' ')
            .trim()
            .replace(/^[^a-zA-Z]+/, '') // Remove leading non-letter characters

          if (phrase && phrase.length > 3) {
            const count = topics.get(phrase) || 0
            topics.set(phrase, count + 1)
          }
        }
      }
    })
  })

  // Sort topics by frequency and get the top 3
  const topTopics = Array.from(topics.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([topic]) => topic)
    .filter(topic => topic.length > 0)

  if (topTopics.length === 0) {
    return 'No major AI developments found for this day.'
  }

  // Create a readable summary
  return `Key AI developments: ${topTopics.join('. ')}.`
}

export function DailySummary({ date, articles }: DailySummaryProps) {
  const formattedDate = format(new Date(date), 'MMMM d, yyyy')
  const summary = summarizeArticles(articles)

  return (
    <div className="bg-white shadow sm:rounded-lg p-6 mb-6">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{formattedDate}</h3>
        <p className="mt-2 text-sm text-gray-600">{summary}</p>
        <p className="mt-1 text-xs text-gray-500">{articles.length} articles found</p>
      </div>
      <div className="space-y-4">
        {articles.map((article) => (
          article && (
            <article key={article.url || Math.random()} className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-base font-medium text-gray-900">
                {article.url ? (
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline">
                    {article.title || 'Untitled Article'}
                  </a>
                ) : (
                  <span>{article.title || 'Untitled Article'}</span>
                )}
              </h4>
              {article.description && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{article.description}</p>
              )}
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                <span>{article.source?.name || 'Unknown Source'}</span>
                {article.publishedAt && (
                  <span>{format(new Date(article.publishedAt), 'h:mm a')}</span>
                )}
              </div>
            </article>
          )
        ))}
      </div>
    </div>
  )
} 