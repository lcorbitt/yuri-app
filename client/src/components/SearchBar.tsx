import { TextInput, ActionIcon } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useState, useCallback } from 'react'
import debounce from 'lodash/debounce'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('')

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      onSearch(searchQuery)
    }, 500),
    [onSearch]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    debouncedSearch(newQuery)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        placeholder="Search incidents..."
        value={query}
        onChange={handleChange}
        rightSection={
          <ActionIcon type="submit" variant="subtle" color="gray">
            <IconSearch size={16} />
          </ActionIcon>
        }
      />
    </form>
  )
}
