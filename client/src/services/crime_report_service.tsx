import axios from 'axios'
import { CrimeReport } from '../dto/crime_report'

const crimeReportService = {
  create: async (data: CrimeReport) => {
    const response = await axios.post('/crime-reports', data)
    return response.data
  },
}

export default crimeReportService
