import { TextInput, ActionIcon } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        placeholder="Search incidents..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rightSection={
          <ActionIcon type="submit" variant="subtle" color="gray">
            <IconSearch size={16} />
          </ActionIcon>
        }
      />
    </form>
  )
}
