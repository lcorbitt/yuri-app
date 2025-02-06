export interface CrimeReport {
  title: string
  description: string
  location: string
  date: string
  status?: 'PENDING' | 'INVESTIGATING' | 'RESOLVED' | 'CLOSED'
  category_id?: number
  user_id?: number
}
