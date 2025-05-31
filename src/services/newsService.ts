// Note: Replace with your actual NewsAPI key
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || ''
const API_BASE_URL = 'https://newsapi.org/v2'

export type NewsCategory = 'All' | 'Research' | 'Industry' | 'Applications' | 'Ethics' | 'Policy'
export type TimeFrame = 'day' | 'week' | 'month'

export async function fetchAINews(category: NewsCategory = 'All', timeFrame: TimeFrame = 'week') {
  try {
    // Build a more comprehensive query for better AI news coverage
    let query = '("artificial intelligence" OR "machine learning" OR "deep learning" OR "AI")'
    
    // Add category-specific keywords
    if (category !== 'All') {
      const categoryKeywords = {
        Research: 'research OR study OR discovery OR breakthrough',
        Industry: 'business OR company OR startup OR enterprise OR market',
        Applications: 'application OR solution OR product OR implementation OR deployment',
        Ethics: 'ethics OR bias OR fairness OR responsibility OR governance',
        Policy: 'policy OR regulation OR law OR government OR compliance'
      }
      query += ` AND (${categoryKeywords[category]})`
    }

    const fromDate = new Date()
    switch (timeFrame) {
      case 'day':
        fromDate.setDate(fromDate.getDate() - 1)
        break
      case 'week':
        fromDate.setDate(fromDate.getDate() - 7)
        break
      case 'month':
        fromDate.setMonth(fromDate.getMonth() - 1)
        break
    }

    const response = await fetch(`${API_BASE_URL}/everything?` + new URLSearchParams({
      q: query,
      from: fromDate.toISOString(),
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: '100', // Fetch more articles for better grouping
      apiKey: API_KEY
    }))

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch news')
    }

    return data.articles
  } catch (error) {
    console.error('Error fetching AI news:', error)
    return []
  }
} 