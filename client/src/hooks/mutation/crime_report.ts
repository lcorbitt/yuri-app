import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CrimeReport } from '../../dto/crime_report'
import crimeReportService from '../../services/crime_report_service'
import { toast } from 'react-hot-toast'
export const useCreateCrimeReport = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CrimeReport) => {
      // Show loading toast
      toast.loading('Creating crime report...', { id: 'createReport' })
      return crimeReportService.create(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crimeReports'] })
      // Dismiss loading and show success
      toast.success('Incident reported successfully', {
        id: 'createReport',
      })
    },
    onError: (error) => {
      console.error('Failed to create crime report:', error)
      // Dismiss loading and show error
      toast.error('Failed to create crime report', { id: 'createReport' })
    },
  })
}
