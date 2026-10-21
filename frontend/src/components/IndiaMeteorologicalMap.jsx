import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, Tooltip } from 'react-leaflet';

export default function IndiaMeteorologicalMap({
  districts = [],
  selectedDistrict = null,
  onSelectDistrict = () => {},
  showRegimeLayers = false,
  regimeData = null,
  activeLayer = 'rainfall',
  modelView = 'ai' // 'raw', 'ai', 'delta'
}) {
  const center = [22.0, 80.0];
  const zoom = 5;

  const getMarkerColor = (d) => {
    if (modelView === 'raw') {
      if (d.raw_rain_mm >= 204.5) return '#EF4444';
      if (d.raw_rain_mm >= 115.6) return '#F97316';
      if (d.raw_rain_mm >= 64.5) return '#F59E0B';
      if (d.raw_rain_mm >= 15.6) return '#0284C7';
      return '#38BDF8';
    }
    
    // AI corrected
    if (d.alert_level === 'red') return '#EF4444';
    if (d.alert_level === 'orange') return '#F97316';
    if (d.alert_level === 'yellow') return '#F59E0B';
    return '#10B981';
  };

  const getMarkerRadius = (d) => {
    const val = modelView === 'raw' ? d.raw_rain_mm : d.ai_corrected_mm;
    if (val >= 204.5) return 14;
    if (val >= 115.6) return 11;
    if (val >= 64.5) return 8;
    return 6;
  };

  return (
    <div className="relative w-full h-full min-h-[480px] rounded-xl overflow-hidden border border-surface-container-high/80 bg-surface-container-lowest shadow-inner">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ minHeight: '480px', height: '100%', background: '#0b0b0d' }}
      >
        {/* CartoDB Dark Matter Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> | IMD & Open-Meteo'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={18}
        />

        {/* Regime Overlay: Monsoon Trough & Vortices */}
        {showRegimeLayers && regimeData && (
          <>
            {regimeData.troughs?.map((t, idx) => (
              <Polyline
                key={`trough-${idx}`}
                positions={t.coordinates}
                pathOptions={{
                  color: idx === 0 ? '#FFB300' : '#38BDF8',
                  weight: 3,
                  dashArray: '8, 8',
                  opacity: 0.9
                }}
              >
                <Tooltip sticky permanent={false} className="bg-surface text-on-surface">
                  {t.name} ({t.status})
                </Tooltip>
              </Polyline>
            ))}

            {regimeData.vortices?.map((v) => (
              <React.Fragment key={v.id}>
                {/* Vortex Center */}
                <CircleMarker
                  center={[v.lat, v.lon]}
                  radius={18}
                  pathOptions={{
                    color: '#EF4444',
                    fillColor: '#93000A',
                    fillOpacity: 0.7,
                    weight: 2
                  }}
                >
                  <Tooltip permanent direction="top" className="bg-surface-container text-error text-xs font-mono">
                    🌀 {v.name} ({v.pressure_hpa} hPa)
                  </Tooltip>
                </CircleMarker>

                {/* Projected Track */}
                <Polyline
                  positions={[
                    ...v.track_history.map(p => [p.lat, p.lon]),
                    [v.lat, v.lon],
                    ...v.projected_track.map(p => [p.lat, p.lon])
                  ]}
                  pathOptions={{
                    color: '#FFB4AB',
                    weight: 2,
                    dashArray: '4, 4'
                  }}
                />
              </React.Fragment>
            ))}
          </>
        )}

        {/* District Markers */}
        {districts.map((d) => {
          const isSelected = selectedDistrict?.id === d.id;
          const markerColor = getMarkerColor(d);
          const radius = getMarkerRadius(d);

          return (
            <CircleMarker
              key={d.id}
              center={[d.lat, d.lon]}
              radius={isSelected ? radius + 4 : radius}
              eventHandlers={{
                click: () => onSelectDistrict(d)
              }}
              pathOptions={{
                color: isSelected ? '#FFB300' : markerColor,
                fillColor: markerColor,
                fillOpacity: isSelected ? 0.95 : 0.75,
                weight: isSelected ? 3 : 1.5
              }}
            >
              <Tooltip direction="top" offset={[0, -6]} opacity={0.95}>
                <div className="text-xs font-mono">
                  <strong>{d.name}</strong> ({d.state})<br />
                  Rain: {d.ai_corrected_mm} mm/24h (AI) | {d.raw_rain_mm} mm (Raw)<br />
                  Delta: <span className={d.delta_mm < 0 ? "text-secondary" : "text-tertiary"}>{d.delta_mm} mm</span>
                </div>
              </Tooltip>

              <Popup>
                <div className="p-1 min-w-[210px] text-on-surface">
                  <div className="flex items-center justify-between border-b border-surface-container-high pb-1.5 mb-2">
                    <span className="font-headline font-bold text-sm text-primary">{d.name}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                      d.alert_level === 'red' ? 'bg-error-container text-error' :
                      d.alert_level === 'orange' ? 'bg-primary-container/20 text-primary-container' :
                      d.alert_level === 'yellow' ? 'bg-primary-fixed-dim/20 text-primary-fixed-dim' :
                      'bg-tertiary-container/20 text-tertiary'
                    }`}>
                      {d.alert_label}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-2">
                    <div>
                      <span className="text-outline text-[10px]">AI-CORRECTED</span>
                      <p className="font-bold text-sm text-on-surface">{d.ai_corrected_mm} mm</p>
                    </div>
                    <div>
                      <span className="text-outline text-[10px]">RAW NWP</span>
                      <p className="font-bold text-sm text-outline-variant">{d.raw_rain_mm} mm</p>
                    </div>
                    <div>
                      <span className="text-outline text-[10px]">AI DELTA BIAS</span>
                      <p className={`font-bold text-sm ${d.delta_mm < 0 ? "text-secondary" : "text-tertiary"}`}>
                        {d.delta_mm > 0 ? `+${d.delta_mm}` : d.delta_mm} mm
                      </p>
                    </div>
                    <div>
                      <span className="text-outline text-[10px]">SKILL CONF</span>
                      <p className="font-bold text-sm text-tertiary">{d.confidence_pct}%</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectDistrict(d)}
                    className="w-full mt-1 bg-primary-container text-on-primary-container hover:bg-surface-tint font-bold py-1 px-2 rounded text-xs transition-colors"
                  >
                    Open District Telemetry
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Floating IMD Rainfall Legend Bar */}
      <div className="absolute bottom-3 right-3 z-[1000] bg-surface-container-low/90 backdrop-blur-md px-3 py-2 rounded-lg border border-surface-container-high/80 shadow-xl flex flex-col gap-1.5 max-w-xs">
        <span className="font-headline text-[10px] text-outline uppercase tracking-wider font-semibold">
          IMD Rainfall Severity Scale (24h)
        </span>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
            <span className="text-[10px] font-mono text-on-surface-variant">&lt;15.5mm</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
            <span className="text-[10px] font-mono text-on-surface-variant">&gt;64.5mm</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]"></span>
            <span className="text-[10px] font-mono text-on-surface-variant">&gt;115mm</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-pulse"></span>
            <span className="text-[10px] font-mono text-error font-bold">&gt;204mm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
