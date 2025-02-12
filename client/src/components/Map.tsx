import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression, Icon } from 'leaflet'

// Fix for default markers
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const CrimeMap = () => {
  const center: LatLngExpression = [40.585258, -105.084419]

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={center} icon={defaultIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default CrimeMap
