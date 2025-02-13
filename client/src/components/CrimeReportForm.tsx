import { useState } from 'react'
import { useCreateCrimeReport } from '../hooks/mutation/crime_report'
import {
  TextInput,
  Textarea,
  Button,
  Paper,
  Stack,
  Container,
  Title,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
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

  const createCrimeReport = useCreateCrimeReport()

  const handleAddressSelect = (result) => {
    setFormData((prev) => ({
      ...prev,
      location: result.properties.formatted,
    }))
  }

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createCrimeReport.mutateAsync(formData)
      setFormData({
        title: '',
        description: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
      })
    } catch (error) {
      // Error is handled by the mutation
    }
  }

  return (
    <Container size="sm" my="xl">
      <Paper shadow="sm" radius="md" p="xl" withBorder>
        <Title order={2} ta="center" mb="xl">
          Submit Incident Report
        </Title>

        <form onSubmit={handleSubmit} className="crime-report-form">
          <Stack gap="md">
            <TextInput
              className="title-input-wrapper"
              label="Title"
              placeholder="Enter report title"
              required
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />

            <Textarea
              label="Description"
              placeholder="Provide detailed description of the incident"
              required
              minRows={4}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />

            <div>
              {/* <Input required mb="xs" value={formData.location} readOnly /> */}
              <GeoapifyContext apiKey="1e74a0294756437d92e735bad855630f">
                <GeoapifyGeocoderAutocomplete
                  placeholder="Search for address"
                  value={formData.location}
                  type={'street'}
                  lang={'en'}
                  limit={5}
                  filterByCountryCode={['us']}
                  placeSelect={handleAddressSelect}
                />
              </GeoapifyContext>
            </div>

            <DateInput
              label="Date of Incident"
              placeholder="Select date"
              value={formData.date ? new Date(formData.date) : null}
              onChange={(date) =>
                handleChange(
                  'date',
                  date ? date.toISOString().split('T')[0] : ''
                )
              }
              required
            />

            <Button
              type="submit"
              loading={createCrimeReport.isPending}
              fullWidth
              mt="md"
            >
              {createCrimeReport.isPending ? 'Submitting...' : 'Submit Report'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
