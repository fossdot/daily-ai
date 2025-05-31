import { CalendarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { format, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { fetchAINews } from '../services/newsService'
import type { Article } from '../types'
import { DailySummary } from './DailySummary'

export function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadNews() {
      try {
        const news = await fetchAINews()
        setArticles(news)
        setError(null)
      } catch (err) {
        setError('Failed to load news. Please try again later.')
        console.error('Error loading news:', err)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  if (loading) {
    return (
      <div className="bg-white shadow sm:rounded-lg p-6">
        <div className="animate-pulse space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white shadow sm:rounded-lg p-6">
        <div className="text-center text-red-600">{error}</div>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="bg-white shadow sm:rounded-lg p-6">
        <div className="text-center text-gray-500">No news articles found.</div>
      </div>
    )
  }

  // Group articles by date
  const articlesByDate = articles.reduce<Record<string, Article[]>>((acc, article) => {
    const date = format(parseISO(article.publishedAt), 'yyyy-MM-dd')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(article)
    return acc
  }, {})

  // Sort dates in descending order
  const sortedDates = Object.keys(articlesByDate).sort((a, b) => b.localeCompare(a))

  return (
    <div className="space-y-6">
      {sortedDates.map(date => (
        <DailySummary
          key={date}
          date={date}
          articles={articlesByDate[date]}
        />
      ))}
    </div>
  )
} 