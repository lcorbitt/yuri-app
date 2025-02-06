import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CrimeReport } from '../../dto/crime_report'
import crimeReportService from '../../services/crime_report_service'

export const useCreateCrimeReport = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CrimeReport) => crimeReportService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crimeReports'] })
      console.log('Crime report created successfully')
    },
    onError: (error) => {
      console.error('Failed to create crime report:', error)
    },
  })
}
