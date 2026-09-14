"use client"

import { useEffect, useMemo } from "react"
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

type MapOutlet = { id: number; name: string; address: string; weight: number; lat: number; lng: number }
type MapRoute = { vehicle: number; stops: MapOutlet[]; color: string }

function FitBounds({ outlets }: { outlets: MapOutlet[] }) {
  const map = useMap()
  useEffect(() => {
    if (outlets.length) map.fitBounds(L.latLngBounds(outlets.map((outlet) => [outlet.lat, outlet.lng])), { padding: [40, 40] })
  }, [map, outlets])
  return null
}

export default function RouteMap({ outlets, routes, activeRoute, showRoads, onRouteClick }: { outlets: MapOutlet[]; routes: MapRoute[]; activeRoute: number | null; showRoads: boolean; onRouteClick: (vehicle: number) => void }) {
  const routeLines = useMemo(() => routes.map((route) => ({ ...route, points: [[-6.2146, 106.8451] as [number, number], ...route.stops.map((stop) => [stop.lat, stop.lng] as [number, number]), [-6.2146, 106.8451] as [number, number]] })), [routes])
  return <MapContainer center={[-6.2146, 106.825]} zoom={12} scrollWheelZoom className="leaflet-map"><TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><FitBounds outlets={outlets} /><CircleMarker center={[-6.2146, 106.8451]} radius={10} pathOptions={{ color: "#14392a", fillColor: "#14392a", fillOpacity: 1 }}><Popup><b>Hub TERRANAVA</b><br />Titik awal dan akhir armada</Popup></CircleMarker>{outlets.map((outlet) => <CircleMarker key={outlet.id} center={[outlet.lat, outlet.lng]} radius={8} pathOptions={{ color: "#fff", weight: 3, fillColor: "#2b8a4b", fillOpacity: 1 }}><Popup><b>{outlet.name}</b><br />{outlet.weight} kg organik</Popup></CircleMarker>)}{routeLines.map((route) => <Polyline key={route.vehicle} positions={route.points} pathOptions={{ color: route.color, weight: activeRoute === null || activeRoute === route.vehicle ? 5 : 2, opacity: activeRoute === null || activeRoute === route.vehicle ? 0.9 : 0.25, dashArray: showRoads ? undefined : "8 10" }} eventHandlers={{ click: () => onRouteClick(route.vehicle) }} />)}</MapContainer>
}
