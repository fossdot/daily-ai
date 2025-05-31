declare module 'newsapi' {
  export interface Article {
    source: {
      id: string | null
      name: string
    }
    author: string | null
    title: string
    description: string | null
    url: string
    urlToImage: string | null
    publishedAt: string
    content: string | null
  }

  export interface NewsAPIResponse {
    status: string
    totalResults: number
    articles: Article[]
  }

  export interface Options {
    q?: string
    sources?: string
    domains?: string
    from?: string
    to?: string
    language?: string
    sortBy?: 'relevancy' | 'popularity' | 'publishedAt'
    page?: number
    pageSize?: number
  }

  export default class NewsAPI {
    constructor(apiKey: string)
    v2: {
      everything(options: Options): Promise<NewsAPIResponse>
      topHeadlines(options: Options): Promise<NewsAPIResponse>
      sources(options: Options): Promise<NewsAPIResponse>
    }
  }
} 