'use client'

import React from 'react'
import { useState } from 'react'
import { NewsFeed } from '../components/NewsFeed'
import { NewsFilters } from '../components/NewsFilters'
import type { NewsCategory, TimeFrame } from '../services/newsService'

export default function Home() {
  const [filters, setFilters] = useState<{
    category: NewsCategory
    timeFrame: TimeFrame
  }>({
    category: 'All',
    timeFrame: 'week'
  })

  const handleFilterChange = (category: NewsCategory, timeFrame: TimeFrame) => {
    setFilters({ category, timeFrame })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest AI News & Developments</h2>
        <NewsFilters onFilterChange={handleFilterChange} />
      </div>
      <NewsFeed key={`${filters.category}-${filters.timeFrame}`} />
    </div>
  )
}
