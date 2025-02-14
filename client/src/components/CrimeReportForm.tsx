import { useState } from 'react'
import { useCreateCrimeReport } from '../hooks/mutation/crime_report'
import { toast } from 'react-hot-toast'
import {
  TextInput,
  Textarea,
  Button,
  Paper,
  Stack,
  Container,
  Title,
  Text,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

export const CrimeReportForm = () => {
  const createCrimeReport = useCreateCrimeReport()
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    location: false,
    date: false,
  })

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: new Date().toLocaleDateString('en-US'),
  })

  const handleAddressSelect = (result) => {
    setFormData((prev) => ({
      ...prev,
      location: result.properties.formatted,
    }))
    setErrors((prev) => ({ ...prev, location: false }))
  }

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: false }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = {
      title: !formData.title.trim(),
      description: !formData.description.trim(),
      location: !formData.location,
      date: !formData.date,
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some((error) => error)) {
      if (newErrors.title) toast.error('Please enter a title')
      if (newErrors.description) toast.error('Please provide a description')
      if (newErrors.location) toast.error('Please select a location')
      if (newErrors.date) toast.error('Please select a date')
      return
    }

    try {
      await createCrimeReport.mutateAsync(formData)
      toast.success('Report submitted successfully')
      setFormData({
        title: '',
        description: '',
        location: '',
        date: new Date().toLocaleDateString('en-US'),
      })
      setErrors({
        title: false,
        description: false,
        location: false,
        date: false,
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
              label={
                <>
                  Title <span style={{ color: 'red' }}>*</span>
                </>
              }
              placeholder="Enter report title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              error={errors.title}
            />

            <Textarea
              label={
                <>
                  Description <span style={{ color: 'red' }}>*</span>
                </>
              }
              placeholder="Provide detailed description of the incident"
              minRows={4}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              error={errors.description}
            />

            <div>
              <Text size="sm" fw={500} mb={4}>
                Location <span style={{ color: 'red' }}>*</span>
              </Text>
              <div
                style={{
                  border: errors.location
                    ? '1px solid var(--mantine-color-red-filled)'
                    : 'none',
                  borderRadius: '4px',
                }}
              >
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
            </div>

            <DateInput
              label={
                <>
                  Date of Incident <span style={{ color: 'red' }}>*</span>
                </>
              }
              placeholder="Select date"
              value={formData.date ? new Date(formData.date) : null}
              onChange={(date) =>
                handleChange(
                  'date',
                  date
                    ? new Date(
                        date.getTime() - date.getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .split('T')[0]
                    : ''
                )
              }
              valueFormat="MMMM D, YYYY"
              error={errors.date}
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
