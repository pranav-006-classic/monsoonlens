import React, { useState, useEffect } from 'react';
import HyetographChart from '../components/HyetographChart';
import { fetchDistrictDetail } from '../api';

export default function DistrictExplorerView({
  districts = [],
  selectedDistrict = null,
  onSelectDistrict = () => {}
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All India');
  const [districtDetail, setDistrictDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [liveSyncMessage, setLiveSyncMessage] = useState('');

  // When selected district changes or mounts, fetch full detail
  useEffect(() => {
    const currentId = selectedDistrict?.id || (districts.length > 0 ? districts[0].id : null);
    if (currentId) {
      setLoadingDetail(true);
      fetchDistrictDetail(currentId).then(data => {
        setDistrictDetail(data);
        setLoadingDetail(false);
      });
    }
  }, [selectedDistrict, districts]);

  // Filter districts by search query and region
  const filtered = districts.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'All India' || d.region.toLowerCase() === selectedRegion.toLowerCase();
    return matchesSearch && matchesRegion;
  });

  const handleLiveSync = async () => {
    if (!districtDetail) return;
    setLiveSyncMessage('Querying Open-Meteo live API...');
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/live-sync?lat=${districtDetail.lat}&lon=${districtDetail.lon}`);
      const data = await res.json();
      if (data.synced) {
        setLiveSyncMessage(`Live Open-Meteo sync OK (${data.live_openmeteo_daily?.length || 7} days retrieved)`);
      } else {
        setLiveSyncMessage('Fallback cached telemetry applied');
      }
    } catch {
      setLiveSyncMessage('Live sync connection error');
    }
    setTimeout(() => setLiveSyncMessage(''), 4000);
  };

  return (
    <div className="flex flex-col gap-5 p-4 lg:p-6">
      {/* Top Search & Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80">
        {/* Search Input */}
        <div className="relative flex items-center md:col-span-2">
          <span className="material-symbols-outlined absolute left-3 text-outline text-[20px]">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search district or state (e.g. Mumbai, Cherrapunji, Wayanad, Puri)..."
            className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline text-sm pl-10 pr-4 py-2.5 rounded-lg border border-surface-container-high focus:outline-none focus:border-primary transition-colors font-mono"
          />
        </div>

        {/* Region Filter */}
        <div className="relative flex items-center">
          <select
            value={selectedRegion}
            onChange={e => setSelectedRegion(e.target.value)}
            className="w-full bg-surface-container-lowest text-on-surface text-sm px-3 py-2.5 rounded-lg border border-surface-container-high focus:outline-none focus:border-primary appearance-none font-mono"
          >
            <option>All India</option>
            <option>Western Ghats</option>
            <option>Northeast</option>
            <option>Coastal AP</option>
            <option>Central India</option>
            <option>North India</option>
            <option>South Peninsular</option>
            <option>Eastern</option>
          </select>
          <span className="material-symbols-outlined absolute right-3 text-outline pointer-events-none text-[18px]">
            expand_more
          </span>
        </div>
      </div>

      {/* Main Grid: Districts List (Left) & Detailed Telemetry Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: District List (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3 bg-surface-container-low p-4 rounded-xl border border-surface-container-high/80">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
            <span className="font-headline font-bold text-xs text-outline uppercase tracking-wider">
              Monitored Districts ({filtered.length})
            </span>
            <span className="text-[10px] font-mono text-tertiary">Live Telemetry</span>
          </div>

          <div className="flex flex-col gap-2 max-h-[640px] overflow-y-auto pr-1">
            {filtered.map(d => {
              const isSelected = (districtDetail?.id === d.id) || (selectedDistrict?.id === d.id);
              return (
                <div
                  key={d.id}
                  onClick={() => {
                    onSelectDistrict(d);
                    setLoadingDetail(true);
                    fetchDistrictDetail(d.id).then(data => {
                      setDistrictDetail(data);
                      setLoadingDetail(false);
                    });
                  }}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-surface-container-high border-primary shadow-[0_0_12px_rgba(255,179,0,0.15)]'
                      : 'bg-surface-container-lowest border-surface-container-high/70 hover:border-outline'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-headline font-bold text-sm text-on-surface">{d.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      d.alert_level === 'red' ? 'bg-error/20 text-error border border-error/30' :
                      d.alert_level === 'orange' ? 'bg-primary-container/20 text-primary-container border border-primary-container/30' :
                      d.alert_level === 'yellow' ? 'bg-primary-fixed-dim/20 text-primary-fixed-dim border border-primary-fixed-dim/30' :
                      'bg-tertiary-container/20 text-tertiary border border-tertiary-container/30'
                    }`}>
                      {d.alert_label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-outline">
                    <span>{d.state} · {d.region}</span>
                    <span className="text-on-surface font-semibold">
                      AI: <strong className="text-primary">{d.ai_corrected_mm} mm</strong>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-surface-container-high/60">
                    <span className="text-outline">Raw GFS: {d.raw_rain_mm} mm</span>
                    <span className={d.delta_mm < 0 ? "text-secondary font-bold" : "text-tertiary font-bold"}>
                      Delta: {d.delta_mm > 0 ? `+${d.delta_mm}` : d.delta_mm} mm
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Telemetry Inspector (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {districtDetail ? (
            <>
              {/* Header Card */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80 flex flex-col gap-3">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-headline font-bold text-xl text-primary">{districtDetail.name}</h2>
                      <span className="text-xs font-mono bg-surface-container-high px-2 py-0.5 rounded text-outline">
                        IMD Station: {districtDetail.station_code}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-on-surface-variant mt-0.5">
                      State: {districtDetail.state} | Sub-division: {districtDetail.subdivision} | Coordinates: {districtDetail.lat}°N, {districtDetail.lon}°E
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleLiveSync}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-xs font-mono text-primary border border-primary/30 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">sync</span>
                      Live Sync Open-Meteo
                    </button>
                  </div>
                </div>

                {liveSyncMessage && (
                  <div className="p-2 rounded bg-tertiary/10 border border-tertiary/30 text-tertiary text-xs font-mono">
                    {liveSyncMessage}
                  </div>
                )}

                {/* Quick Telemetry Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-surface-container-high/60">
                  <div className="p-2.5 rounded bg-surface-container-lowest border border-surface-container-high">
                    <span className="text-[10px] font-mono text-outline block">DAY 1 AI RAINFALL</span>
                    <span className="text-lg font-mono font-bold text-primary">{districtDetail.ai_corrected_mm} mm</span>
                  </div>
                  <div className="p-2.5 rounded bg-surface-container-lowest border border-surface-container-high">
                    <span className="text-[10px] font-mono text-outline block">RAW GFS NWP</span>
                    <span className="text-lg font-mono font-bold text-outline-variant">{districtDetail.raw_rain_mm} mm</span>
                  </div>
                  <div className="p-2.5 rounded bg-surface-container-lowest border border-surface-container-high">
                    <span className="text-[10px] font-mono text-outline block">AI DELTA CORRECTION</span>
                    <span className={`text-lg font-mono font-bold ${districtDetail.delta_mm < 0 ? "text-secondary" : "text-tertiary"}`}>
                      {districtDetail.delta_mm > 0 ? `+${districtDetail.delta_mm}` : districtDetail.delta_mm} mm
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-surface-container-lowest border border-surface-container-high">
                    <span className="text-[10px] font-mono text-outline block">FLOOD WARNING TIER</span>
                    <span className="text-xs font-mono font-bold text-error">{districtDetail.flood_warning_tier}</span>
                  </div>
                </div>
              </div>

              {/* 24h Hyetograph Card (Recharts) */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80 flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
                  <span className="font-headline font-bold text-xs text-outline uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">bar_chart</span>
                    24-Hour Localized Precipitation Hyetograph (Hourly Rain Rates)
                  </span>
                  <span className="text-[10px] font-mono text-tertiary">Real-time GFS vs AI Output</span>
                </div>
                <HyetographChart hourlySeries={districtDetail.hourly_series} />
              </div>

              {/* 7-Day Lead Time Forecast Cards */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80 flex flex-col gap-3">
                <span className="font-headline font-bold text-xs text-outline uppercase tracking-wider">
                  7-Day Lead Time Forecast Progression (IMD Standard Multi-Day Outlook)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {districtDetail.daily_series?.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-high flex flex-col gap-1 text-center"
                    >
                      <span className="text-[10px] font-mono text-outline font-semibold">{item.lead_time.split(" ")[0]}</span>
                      <span className="text-[11px] font-mono text-on-surface-variant">{item.date}</span>
                      <span className="text-base font-mono font-bold text-primary my-1">{item.ai_mm} mm</span>
                      <span className="text-[9px] font-mono text-secondary">
                        Spread: {item.ensemble_spread_min}-{item.ensemble_spread_max}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 rounded-xl bg-surface-container-low border border-surface-container-high/80 text-center text-outline font-mono">
              Select a district to view detailed meteorological telemetry
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
