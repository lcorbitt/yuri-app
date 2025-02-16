import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression, Icon, LatLng } from 'leaflet'
import { useContext, useState } from 'react'
import ColorSchemeContext from '../ColorSchemeContext'

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

interface MapProps {
  center?: LatLngExpression
}

const Map = ({
  center = [40.585258, -105.084419] as LatLngExpression,
}: MapProps) => {
  const { colorScheme } = useContext(ColorSchemeContext)
  const isDark = colorScheme === 'dark'
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const tileUrl = isDark
    ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png'
    : 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

  return (
    <MapContainer
      key={`${center[0]}-${center[1]}`}
      center={center}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url={tileUrl} />
      <Marker
        position={center}
        icon={defaultIcon}
        eventHandlers={{
          mouseover: (e) => {
            if (!isPopupOpen) {
              setIsPopupOpen(true)
              e.target.openPopup()
            }
          },
          mouseout: (e) => {
            setIsPopupOpen(false)
            e.target.closePopup()
          },
        }}
      >
        <Popup autoPan={false}>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
