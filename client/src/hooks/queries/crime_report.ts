import { useQuery } from '@tanstack/react-query'
import crimeReportService from '../../services/crime_report_service'

export const useCrimeReports = () => {
  return useQuery({
    queryKey: ['crimeReports'],
    queryFn: () => crimeReportService.findAll(),
  })
}

export const useCrimeReport = (id: string) => {
  return useQuery({
    queryKey: ['crimeReport', id],
    queryFn: () => crimeReportService.findOne(id),
    enabled: !!id, // Only run the query if we have an ID
  })
}
