'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './SuratMap.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN_HERE';

// Official Corridor Data with Phase and Length
const BRTS_CORRIDORS = [
  { id: 'C1', name: 'Udhna Darwaja — Sachin GIDC', phase: 1, color: '#E8001C', length: '10.2 km', center: [72.8390, 21.1450] },
  { id: 'C2', name: 'ONGC Colony — Canal Rd — Sarthana', phase: 1, color: '#FF6B00', length: '19.7 km', center: [72.8400, 21.1850] },
  { id: 'C3', name: 'Adajan Patiya — Jahangirpura', phase: 2, color: '#9B59B6', length: '15.5 km', center: [72.8400, 21.2100] },
  { id: 'C4', name: 'Adajan Patiya — Pal RTO', phase: 2, color: '#27AE60', length: '8.5 km', center: [72.7820, 21.1800] },
  { id: 'C5', name: 'Pal RTO — ONGC Colony', phase: 2, color: '#F39C12', length: '10.2 km', center: [72.7850, 21.1650] },
  { id: 'C6', name: 'Anuvrat Dwar — St. Thomas School', phase: 2, color: '#16A085', length: '9.8 km', center: [72.8050, 21.1550] },
  { id: 'C7', name: 'St. Thomas School — Daksheshwar', phase: 2, color: '#2980B9', length: '7.3 km', center: [72.8250, 21.1550] },
  { id: 'C8', name: 'Dindoli Varigruh — Hirabaug', phase: 2, color: '#C0392B', length: '11.0 km', center: [72.8400, 21.1480] },
  { id: 'C9', name: 'Hirabaug — Lake Garden', phase: 2, color: '#8E44AD', length: '6.5 km', center: [72.8220, 21.1480] },
  { id: 'C10', name: 'Gajera Circle — Jahangirpura', phase: 2, color: '#D35400', length: '13.2 km', center: [72.8600, 21.2180] },
  { id: 'C11', name: 'Katargam Darwaja — Kosad', phase: 2, color: '#1ABC9C', length: '14.8 km', center: [72.8550, 21.2280] },
];

const CITY_BUS_ROUTES = [
  { id: 'CB5', name: 'Varachha — Adajan', color: '#3498DB', center: [72.8600, 21.2000], length: '22.5 km' },
  { id: 'CB10', name: 'Surat Station — Dumas', color: '#5DADE2', center: [72.8000, 21.1500], length: '18.3 km' },
  { id: 'CB22', name: 'Katargam — Kamrej', color: '#48C9B0', center: [72.8800, 21.2200], length: '25.7 km' },
  { id: 'CB33', name: 'Udhna — City Light — Dumas', color: '#85C1E9', center: [72.8100, 21.1300], length: '20.1 km' },
  { id: 'CB50', name: 'Sachin — Udhna — Station', color: '#2E86C1', center: [72.8400, 21.1300], length: '19.8 km' },
];

const BRTS_STOPS = [
  { name: 'Udhna Darwaja', coords: [72.8540, 21.1920] },
  { name: 'Kharwar Nagar', coords: [72.8500, 21.1815] },
  { name: 'Udhna GSRTC', coords: [72.8462, 21.1705] },
  { name: 'Udhna Academy', coords: [72.8435, 21.1630] },
  { name: 'Daksheswar Mahadev', coords: [72.8402, 21.1536] },
  { name: 'Pandesara G.I.D.C.', coords: [72.8350, 21.1375] },
  { name: 'Green Park', coords: [72.8315, 21.1250] },
  { name: 'Unn Naka', coords: [72.8272, 21.1110] },
  { name: 'Bhestan', coords: [72.8260, 21.1060] },
  { name: 'Sachin G.I.D.C.', coords: [72.8243, 21.0995] },
];

export default function SuratMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  const [activeTab, setActiveTab] = useState<'brts' | 'city'>('brts');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [is3D, setIs3D] = useState(true);
  const [showPanel, setShowPanel] = useState(true);

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [72.8400, 21.1600],
      zoom: 11,
      pitch: 55,
      bearing: -10,
      antialias: true,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    mapRef.current.addControl(new mapboxgl.ScaleControl({ unit: 'metric' }), 'bottom-left');

    popupRef.current = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: 'premium-popup',
    });

    mapRef.current.on('load', () => {
      const map = mapRef.current!;

      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (l) => l.type === 'symbol' && l.layout?.['text-field']
      )?.id;

      map.addLayer(
        {
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 13,
          paint: {
            'fill-extrusion-color': '#e0e0e0',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.7,
          },
        },
        labelLayerId
      );

      // BRTS Routes
      map.addSource('brts-routes', { type: 'geojson', data: '/surat_brts.geojson' as any });
      map.addLayer({
        id: 'brts-glow',
        type: 'line',
        source: 'brts-routes',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': ['get', 'color'], 'line-width': 16, 'line-opacity': 0.15, 'line-blur': 8 },
      });
      map.addLayer({
        id: 'brts-lines',
        type: 'line',
        source: 'brts-routes',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': ['get', 'color'], 'line-width': 4.5 },
      });

      // City Bus Routes
      map.addSource('city-bus-routes', { type: 'geojson', data: '/surat_city_bus.geojson' as any });
      map.addLayer({
        id: 'city-bus-glow',
        type: 'line',
        source: 'city-bus-routes',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': ['get', 'color'], 'line-width': 12, 'line-opacity': 0.1, 'line-blur': 6 },
      });
      map.addLayer({
        id: 'city-bus-lines',
        type: 'line',
        source: 'city-bus-routes',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': ['get', 'color'], 'line-width': 3, 'line-dasharray': [3, 2] },
      });

      // Interaction
      (['brts-lines', 'city-bus-lines'] as const).forEach((layerId) => {
        map.on('mouseenter', layerId, (e) => {
          map.getCanvas().style.cursor = 'pointer';
          const p = e.features![0].properties;
          popupRef.current
            ?.setLngLat(e.lngLat)
            .setHTML(
              `
              <div class="popup-box">
                <div class="popup-header" style="border-left: 4px solid ${p?.color}">
                  <span class="popup-route">${p?.route || p?.id}</span>
                  <span class="popup-name">${p?.name}</span>
                </div>
                <div class="popup-content">
                  ${p?.length_km ? `<div class="popup-detail">Distance: <b>${p.length_km} km</b></div>` : ''}
                  ${p?.phase ? `<div class="popup-detail">Phase: <b>${p.phase}</b></div>` : ''}
                </div>
              </div>`
            )
            .addTo(map);
        });
        map.on('mouseleave', layerId, () => {
          map.getCanvas().style.cursor = '';
          popupRef.current?.remove();
        });
      });

      // BRTS Stops
      map.addSource('brts-stops', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: BRTS_STOPS.map((s) => ({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: s.coords },
            properties: { name: s.name },
          })),
        } as any,
      });

      map.addLayer({
        id: 'brts-stops-circles',
        type: 'circle',
        source: 'brts-stops',
        paint: {
          'circle-radius': 5,
          'circle-color': '#ffffff',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ff4d4f',
          'circle-pitch-alignment': 'map',
        },
      });

      // Hover on stops
      map.on('mouseenter', 'brts-stops-circles', (e) => {
        const geometry = e.features![0].geometry as { coordinates: number[] };
        const coords = geometry.coordinates.slice() as [number, number];
        const p = e.features![0].properties;
        map.getCanvas().style.cursor = 'pointer';
        popupRef.current
          ?.setLngLat(coords)
          .setHTML(`<div class="marker-popup">${p?.name}</div>`)
          .addTo(map);
      });
      map.on('mouseleave', 'brts-stops-circles', () => {
        map.getCanvas().style.cursor = '';
        popupRef.current?.remove();
      });

      setMapLoaded(true);
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const toggle3D = () => {
    const next = !is3D;
    setIs3D(next);
    mapRef.current?.easeTo({ pitch: next ? 55 : 0, bearing: next ? -10 : 0, duration: 800 });
  };

  const resetView = () => {
    mapRef.current?.flyTo({ center: [72.8400, 21.1600], zoom: 11, pitch: 55, bearing: -10, duration: 1500 });
  };

  const focusRoute = (route: { center: number[] }) => {
    mapRef.current?.flyTo({
      center: route.center as [number, number],
      zoom: 13,
      pitch: 60,
      duration: 1200,
    });
  };

  return (
    <div className="surat-dashboard">
      <div ref={mapContainer} className="map-view" />

      {/* Corporate Header */}
      <header className="dashboard-header">
        <div className="brand-group">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="11" width="22" height="8" rx="2" />
              <path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
              <circle cx="7" cy="19" r="2" />
              <circle cx="17" cy="19" r="2" />
            </svg>
          </div>
          <div className="brand-text">
            <h1>Surat Sitilink</h1>
            <p>Unified Transit Infrastructure</p>
          </div>
        </div>
        <button className="panel-btn" onClick={() => setShowPanel(!showPanel)}>
          {showPanel ? 'Hide Panel' : 'Show Panel'}
        </button>
      </header>

      {/* Professional Sidebar */}
      {showPanel && (
        <aside className="dashboard-panel">
          <div className="panel-tabs">
            <button className={`tab-item ${activeTab === 'brts' ? 'active' : ''}`} onClick={() => setActiveTab('brts')}>
              BRTS Net
            </button>
            <button className={`tab-item ${activeTab === 'city' ? 'active' : ''}`} onClick={() => setActiveTab('city')}>
              City Bus
            </button>
          </div>

          <div className="panel-body">
            <div className="scroll-area">
              {(activeTab === 'brts' ? BRTS_CORRIDORS : CITY_BUS_ROUTES).map((route) => (
                <div key={route.id} className="route-card" onClick={() => focusRoute(route)}>
                  <div className="route-indicator" style={{ backgroundColor: route.color }} />
                  <div className="route-details">
                    <span className="route-label">{route.name}</span>
                    <div className="route-meta">
                      {route.id} {route.length ? `• ${route.length}` : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-footer">
            <div className="action-row">
              <button className="icon-btn" onClick={toggle3D}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
                {is3D ? '2D View' : '3D View'}
              </button>
              <button className="icon-btn" onClick={resetView}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Recenter
              </button>
            </div>

            <div className="stats-grid">
              <div className="stat-unit">
                <span className="stat-num">102</span>
                <span className="stat-tag">BRTS km</span>
              </div>
              <div className="stat-unit">
                <span className="stat-num">290</span>
                <span className="stat-tag">City km</span>
              </div>
              <div className="stat-unit">
                <span className="stat-num">148</span>
                <span className="stat-tag">Stations</span>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Professional Footer Badge */}
      <footer className="dashboard-footer">
        Verified corridor data provided by Surat Municipal Corporation. Visual representation for demonstration purposes.
      </footer>
    </div>
  );
}
