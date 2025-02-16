import axios from 'axios'
import { LatLngExpression } from 'leaflet'

export const extractCityState = (
  address: string
): { city: string; state: string } => {
  const parts = address.split(',').map((part) => part.trim())

  for (let i = 0; i < parts.length - 1; i++) {
    const nextPart = parts[i + 1].trim()

    const stateMatch = nextPart.match(/^\s*([A-Z]{2})\b/)
    if (stateMatch) {
      return {
        city: parts[i],
        state: stateMatch[1],
      }
    }
  }

  return {
    city: '',
    state: '',
  }
}

export const extractStreetAddress = (address: string): string => {
  return address.split(',')[0].trim()
}

export const getCoordinatesFromAddress = async (
  address: string
): Promise<LatLngExpression> => {
  try {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        address
      )}&format=json&apiKey=1e74a0294756437d92e735bad855630f`
    )

    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const { lat, lon } = response.data.results[0]
      return [lat, lon] as LatLngExpression
    }

    throw new Error('No coordinates found for this address')
  } catch (error) {
    console.error('Error geocoding address:', error)
    throw error
  }
}
