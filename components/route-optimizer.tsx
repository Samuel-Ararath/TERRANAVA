"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { ArrowLeft, Check, ChevronDown, ChevronLeft, ChevronRight, Fuel, LoaderCircle, MapPinned, PackageCheck, RotateCcw, Route, Search, Truck, X } from "lucide-react"

const RouteMap = dynamic(() => import("@/components/route-map"), { ssr: false })

type Outlet = { id: number; name: string; address: string; weight: number; lat: number; lng: number }
type Stop = Outlet & { order: number }
type VehicleRoute = { vehicle: number; stops: Stop[]; distance: number; fuel: number; color: string }

const outlets: Outlet[] = [
  { id: 1, name: "Anomali Coffee Menteng", address: "Jl. HOS Cokroaminoto No. 92, Menteng", weight: 48, lat: -6.1928, lng: 106.8323 },
  { id: 2, name: "Plataran Menteng", address: "Jl. HOS Cokroaminoto No. 42, Menteng", weight: 65, lat: -6.1972, lng: 106.8311 },
  { id: 3, name: "Kopi Kalyan Cikajang", address: "Jl. Cikajang No. 45, Kebayoran Baru", weight: 38, lat: -6.2576, lng: 106.8087 },
  { id: 4, name: "Nusa Indonesian Gastronomy", address: "Jl. Kemang Raya No. 81, Kemang", weight: 72, lat: -6.2587, lng: 106.8142 },
  { id: 5, name: "Tugu Kunstkring Paleis", address: "Jl. Teuku Umar No. 1, Menteng", weight: 56, lat: -6.1946, lng: 106.8292 },
  { id: 6, name: "Sate Khas Senayan", address: "Jl. Pakubuwono VI No. 61, Senayan", weight: 44, lat: -6.2395, lng: 106.7942 },
]

const routeColors = ["#2b8a4b", "#de8d58", "#4779c5"]
const depot = { lat: -6.2146, lng: 106.8451 }

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const earth = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const x = Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return earth * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
}

function optimizeOutlets(selected: Outlet[], vehicleCount: number, capacity: number): VehicleRoute[] {
  const remaining = [...selected].sort((a, b) => b.weight - a.weight)
  const buckets: Outlet[][] = Array.from({ length: vehicleCount }, () => [])
  const loads = Array.from({ length: vehicleCount }, () => 0)
  remaining.forEach((outlet) => {
    let target = loads.findIndex((load) => load + outlet.weight <= capacity)
    if (target === -1) target = loads.indexOf(Math.min(...loads))
    buckets[target].push(outlet)
    loads[target] += outlet.weight
  })
  return buckets.map((bucket, index) => {
    const stops: Stop[] = []
    let current = depot
    const unvisited = [...bucket]
    while (unvisited.length) {
      let nearest = 0
      let nearestDistance = distanceKm(current, unvisited[0])
      unvisited.forEach((stop, stopIndex) => {
        const nextDistance = distanceKm(current, stop)
        if (nextDistance < nearestDistance) { nearest = stopIndex; nearestDistance = nextDistance }
      })
      const [next] = unvisited.splice(nearest, 1)
      stops.push({ ...next, order: stops.length + 1 })
      current = next
    }
    const distance = [depot, ...stops, depot].reduce((sum, point, pointIndex, points) => pointIndex === 0 ? sum : sum + distanceKm(points[pointIndex - 1], point), 0) * 1.18
    return { vehicle: index + 1, stops, distance, fuel: distance * 0.115, color: routeColors[index % routeColors.length] }
  }).filter((route) => route.stops.length > 0)
}

export function RouteOptimizer({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<number[]>(outlets.map((outlet) => outlet.id))
  const [weights, setWeights] = useState<Record<number, number>>(Object.fromEntries(outlets.map((outlet) => [outlet.id, outlet.weight])))
  const [vehicleCount, setVehicleCount] = useState(3)
  const [capacity, setCapacity] = useState(300)
  const [showRoads, setShowRoads] = useState(true)
  const [routes, setRoutes] = useState<VehicleRoute[]>([])
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [activeRoute, setActiveRoute] = useState<number | null>(null)

  const selectedOutlets = useMemo(() => outlets.filter((outlet) => selected.includes(outlet.id)).map((outlet) => ({ ...outlet, weight: weights[outlet.id] ?? outlet.weight })), [selected, weights])
  const totalWeight = selectedOutlets.reduce((sum, outlet) => sum + outlet.weight, 0)
  const totalDistance = routes.reduce((sum, route) => sum + route.distance, 0)
  const totalFuel = routes.reduce((sum, route) => sum + route.fuel, 0)

  const toggleOutlet = (id: number) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const runOptimization = () => {
    setIsOptimizing(true)
    window.setTimeout(() => { setRoutes(optimizeOutlets(selectedOutlets, vehicleCount, capacity)); setIsOptimizing(false) }, 450)
  }
  const reset = () => { setSelected([]); setRoutes([]); setActiveRoute(null) }

  return <main className="route-page">
    <header className="route-topbar">
      <button className="route-back" onClick={onBack} aria-label="Kembali ke Home"><ArrowLeft /> Kembali</button>
      <div className="route-title"><Route /><div><span>OPERATIONS</span><h1>Optimasi Rute</h1></div></div>
      <div className="route-step"><b>02</b><span>/ 04</span><small>RUTE</small></div>
    </header>
    <div className="route-layout">
      <aside className="route-sidebar">
        <section className="route-section"><div className="route-section-heading"><div><span>01 / OUTLET</span><h2>Pilih lokasi</h2></div><button className="route-select-all" onClick={() => setSelected(selected.length === outlets.length ? [] : outlets.map((outlet) => outlet.id))}>{selected.length === outlets.length ? "Hapus semua" : "Pilih semua"}</button></div>
          <div className="outlet-list">{outlets.map((outlet) => <label className={`outlet-row ${selected.includes(outlet.id) ? "is-selected" : ""}`} key={outlet.id}><input type="checkbox" checked={selected.includes(outlet.id)} onChange={() => toggleOutlet(outlet.id)} /><span className="checkmark"><Check /></span><span className="outlet-copy"><b>{outlet.name}</b><small>{outlet.address}</small></span><span className="outlet-weight">{weights[outlet.id]} kg</span></label>)}</div>
        </section>
        <section className="route-section route-settings"><span>02 / PARAMETER</span><h2>Pengaturan armada</h2><label>Jumlah kendaraan <select value={vehicleCount} onChange={(event) => setVehicleCount(Number(event.target.value))}>{[1, 2, 3, 4].map((value) => <option value={value} key={value}>{value} kendaraan</option>)}</select></label><label>Kapasitas per kendaraan <select value={capacity} onChange={(event) => setCapacity(Number(event.target.value))}><option value={200}>200 kg</option><option value={300}>300 kg</option><option value={500}>500 kg</option></select></label><div className="route-toggle-row"><span>Gunakan jalan nyata</span><button aria-pressed={showRoads} className={`route-toggle ${showRoads ? "on" : ""}`} onClick={() => setShowRoads(!showRoads)}><i /></button></div></section>
        <div className="route-actions"><button className="route-primary" onClick={runOptimization} disabled={isOptimizing || selected.length === 0}>{isOptimizing ? <LoaderCircle className="spin" /> : <Route />} {isOptimizing ? "Menghitung..." : "Optimalkan rute"}</button><button className="route-reset" onClick={reset}><RotateCcw /> Reset</button></div>
      </aside>
      <section className="route-content"><div className="route-map-wrap"><RouteMap outlets={selectedOutlets} routes={routes} activeRoute={activeRoute} showRoads={showRoads} onRouteClick={setActiveRoute} /></div><div className="route-results"><div className="result-heading"><div><span>03 / HASIL OPTIMASI</span><h2>Rute siap dijalankan</h2></div><div className="result-metrics"><span><b>{totalDistance.toFixed(1)}</b> km total</span><span><b>{totalFuel.toFixed(1)}</b> L estimasi BBM</span></div></div>{routes.length === 0 ? <div className="route-empty"><MapPinned /><b>Belum ada rute yang dihitung</b><span>Pilih outlet, sesuaikan armada, lalu jalankan optimasi untuk melihat pembagian perjalanan.</span></div> : <div className="route-cards">{routes.map((route) => <article className={`route-card ${activeRoute === route.vehicle ? "active" : ""}`} key={route.vehicle} onClick={() => setActiveRoute(route.vehicle)}><div className="route-card-head"><span className="vehicle-dot" style={{ background: route.color }} /><div><b>Kendaraan {String(route.vehicle).padStart(2, "0")}</b><small>{route.stops.reduce((sum, stop) => sum + stop.weight, 0)} kg · {route.stops.length} titik jemput</small></div><ChevronRight /></div><div className="route-stop-list"><span className="depot-dot" /> <small>Hub TERRANAVA</small>{route.stops.map((stop) => <div className="route-stop" key={stop.id}><i style={{ background: route.color }}>{stop.order}</i><span>{stop.name}</span><b>{stop.weight} kg</b></div>)}<span className="route-card-footer"><Fuel /> {route.distance.toFixed(1)} km · {route.fuel.toFixed(1)} L · sekitar {Math.ceil(route.distance * 3.2)} menit</span></div></article>)}</div>}</div></section>
    </div>
  </main>
}
