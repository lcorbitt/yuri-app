import { useState } from 'react'
import { useCreateCrimeReport } from '../hooks/mutation/crime_report'

import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

export const CrimeReportForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
  })

  const handleAddressSelect = (result) => {
    console.log('Selected address:', result)
    setFormData((prev) => ({
      ...prev,
      location: result.properties.formatted,
    }))
  }

  // const [isGettingLocation, setIsGettingLocation] = useState(false)
  const createCrimeReport = useCreateCrimeReport()

  // const handleGetCurrentLocation = () => {
  //   setIsGettingLocation(true)
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         try {
  //           const response = await fetch(
  //             `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=YOUR_API_KEY`
  //           )
  //           const data = await response.json()
  //           const address = data.results[0].formatted
  //           setFormData((prev) => ({ ...prev, location: address }))
  //         } catch (error) {
  //           console.error('Error getting address:', error)
  //         } finally {
  //           setIsGettingLocation(false)
  //         }
  //       },
  //       (error) => {
  //         console.error('Error getting location:', error)
  //         setIsGettingLocation(false)
  //       }
  //     )
  //   }
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('IN HANDLE SUBMIT', formData)
    createCrimeReport.mutate(formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSuggestionChange = (suggestions) => {
    console.log('Current suggestions:', suggestions)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <div className="flex gap-2">
          <GeoapifyContext apiKey="1e74a0294756437d92e735bad855630f">
            <GeoapifyGeocoderAutocomplete
              placeholder="Enter address here"
              value={formData.location}
              type={'street'}
              lang={'en'}
              limit={10}
              filterByCountryCode={['us']}
              // filterByCircle={filterByCircle}
              // filterByRect={filterByRect}
              // filterByPlace={filterByPlace}
              // biasByCountryCode={biasByCountryCode}
              // biasByCircle={biasByCircle}
              // biasByRect={biasByRect}
              // biasByProximity={biasByProximity}
              placeSelect={handleAddressSelect}
              suggestionsChange={onSuggestionChange}
            />
          </GeoapifyContext>

          {/* <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter address"
            required
            className="flex-grow"
          /> */}
          {/* <button
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={isGettingLocation}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isGettingLocation ? 'Getting Location...' : '📍 Use My Location'}
          </button> */}
        </div>
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        disabled={createCrimeReport.isPending}
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        {createCrimeReport.isPending ? 'Submitting...' : 'Submit Report'}
      </button>
    </form>
  )
}
