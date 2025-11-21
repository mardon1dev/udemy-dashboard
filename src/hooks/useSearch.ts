import { useState, useMemo } from 'react'

export const useSearch = <T>(
  items: T[],
  searchFn?: (items: T[], term: string) => T[],
) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return items
    }

    if (searchFn) {
      return searchFn(items, searchTerm)
    }

    return items.filter((item) =>
      Object.values(item as Record<string, unknown>).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
  }, [items, searchTerm, searchFn])

  const clearSearch = () => {
    setSearchTerm('')
  }

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
    clearSearch,
  }
}


