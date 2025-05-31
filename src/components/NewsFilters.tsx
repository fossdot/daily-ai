import { useState } from 'react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import type { NewsCategory, TimeFrame } from '@/services/newsService'

interface NewsFiltersProps {
  onFilterChange: (category: NewsCategory, timeFrame: TimeFrame) => void
}

export function NewsFilters({ onFilterChange }: NewsFiltersProps) {
  const [category, setCategory] = useState<NewsCategory>('All')
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('week')

  const categories: NewsCategory[] = ['All', 'Research', 'Industry', 'Applications', 'Ethics', 'Policy']
  const timeFrames: { value: TimeFrame; label: string }[] = [
    { value: 'day', label: 'Last 24 Hours' },
    { value: 'week', label: 'Past Week' },
    { value: 'month', label: 'Past Month' }
  ]

  const handleCategoryChange = (newCategory: NewsCategory) => {
    setCategory(newCategory)
    onFilterChange(newCategory, timeFrame)
  }

  const handleTimeFrameChange = (newTimeFrame: TimeFrame) => {
    setTimeFrame(newTimeFrame)
    onFilterChange(category, newTimeFrame)
  }

  return (
    <div className="space-y-6">
      {/* Time Frame Selection */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center text-sm text-gray-600">
          <CalendarIcon className="h-5 w-5 mr-2" />
          <span>Time Range:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {timeFrames.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleTimeFrameChange(value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${timeFrame === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                category === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 