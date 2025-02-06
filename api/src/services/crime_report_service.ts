import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export interface CrimeReportDTO {
  title: string;
  description: string;
  location: string;
  date: string;
}

export const crimeReportService = {
  create: async (data: CrimeReportDTO) => {
    const response = await axios.post(`${API_URL}/crime-reports`, data);
    return response.data;
  },
};
