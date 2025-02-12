import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression, Icon } from 'leaflet'
import { useContext } from 'react'
import ColorSchemeContext from '../ColorSchemeContext'

// Fix for default markers
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const CrimeMap = () => {
  const center: LatLngExpression = [40.585258, -105.084419]
  const { colorScheme } = useContext(ColorSchemeContext)
  const isDark = colorScheme === 'dark'

  const tileUrl = isDark
    ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png'
    : 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url={tileUrl} />
      <Marker position={center} icon={defaultIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default CrimeMap
