export interface CrimeReport {
  id: number
  title: string
  description: string
  location: string
  date: string
  status: 'PENDING' | 'INVESTIGATING' | 'RESOLVED' | 'CLOSED'
  category?: {
    id: number
    name: string
    description?: string
  }
  user?: {
    id: number
    email: string
    full_name: string
    role: 'CITIZEN' | 'OFFICER' | 'ADMIN'
    badge_number?: string
    department?: string
  }
  comments?: Array<{
    id: number
    content: string
    author: {
      id: number
      full_name: string
    }
    created_at: string
  }>
  investigation?: Array<{
    id: number
    notes?: string
    status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED'
    officer: {
      id: number
      full_name: string
      badge_number?: string
    }
    created_at: string
    updated_at: string
  }>
  created_at: string
  updated_at: string
}
