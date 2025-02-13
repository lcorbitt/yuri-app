import { useQuery } from '@tanstack/react-query'
import crimeReportService from '../../services/crime_report_service'

export const useCrimeReports = () => {
  return useQuery({
    queryKey: ['crimeReports'],
    queryFn: () => crimeReportService.findAll(),
  })
}

export const useCrimeReport = (id: number | undefined) => {
  return useQuery({
    queryKey: ['crimeReport', id],
    queryFn: () => {
      if (!id) throw new Error('No ID provided')
      return crimeReportService.findOne(id)
    },
    enabled: !!id,
  })
}
