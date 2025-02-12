import { CrimeReport } from '../dto/crime_report'
import api from '../lib/axios'

const crimeReportService = {
  create: async (data: CrimeReport) => {
    const response = await api.post('/crime-reports', data)
    return response.data
  },
  findAll: async () => {
    const response = await api.get('/crime-reports')
    return response.data
  },
  findOne: async (id: string) => {
    const response = await api.get(`/crime-reports/${id}`)
    return response.data
  },
}

export default crimeReportService
