import { useQuery } from '@tanstack/react-query'
import crimeReportService from '../../services/crime_report_service'

export const useCrimeReports = () => {
  return useQuery({
    queryKey: ['crimeReports'],
    queryFn: () => crimeReportService.findAll(),
  })
}
