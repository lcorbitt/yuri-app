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
