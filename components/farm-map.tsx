'use client'

import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type FarmMarker = { id: string; name: string; lat: number; lng: number; capacity: number; fillColor: string }

export function FarmMap({ farms, onSelect }: { farms: FarmMarker[]; onSelect: (farm: FarmMarker) => void }) {
  return <MapContainer center={[-6.28, 106.82]} zoom={10} scrollWheelZoom className="farm-map"><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />{farms.map((farm) => <CircleMarker key={farm.id} center={[farm.lat, farm.lng]} radius={8} pathOptions={{ color: '#fff', weight: 2, fillColor: farm.fillColor, fillOpacity: .95 }}><Popup><strong>{farm.name}</strong><br />{farm.capacity} kg/hari<br /><button className="farm-popup-button" onClick={() => onSelect(farm)}>Lihat detail</button></Popup></CircleMarker>)}</MapContainer>
}

export default FarmMap
