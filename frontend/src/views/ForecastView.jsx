import React, { useState } from 'react';
import IndiaMeteorologicalMap from '../components/IndiaMeteorologicalMap';

export default function ForecastView({
  districts,
  selectedDistrict,
  onSelectDistrict
}) {
  const [leadTime, setLeadTime] = useState('Day 1');
  const [modelMode, setModelMode] = useState('ai'); // 'raw', 'ai', 'delta'
  const [activeLayer, setActiveLayer] = useState('rainfall');
  const [thresholds, setThresholds] = useState({
    heavy: true,
    veryHeavy: true,
    extreme: true
  });

  const filteredDistricts = districts.filter(d => {
    if (d.alert_level === 'red' && thresholds.extreme) return true;
    if (d.alert_level === 'orange' && thresholds.veryHeavy) return true;
    if (d.alert_level === 'yellow' && thresholds.heavy) return true;
    if (d.alert_level === 'green') return true;
    return false;
  });

  return (
    <div className="flex flex-col gap-5 p-4 lg:p-6">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80">
        {/* Model Mode Selector */}
        <div className="flex flex-col gap-1">
          <span className="font-headline text-[10px] text-outline uppercase tracking-wider font-semibold">
            Post-Processing Pipeline Mode
          </span>
          <div className="flex items-center bg-surface-container-lowest p-1 rounded-lg border border-surface-container-high">
            <button
              onClick={() => setModelMode('raw')}
              className={`px-3 py-1 rounded font-mono text-xs transition-colors ${
                modelMode === 'raw'
                  ? 'bg-surface-container-high text-secondary font-bold border border-secondary/30'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              Open-Meteo GFS (Raw)
            </button>
            <button
              onClick={() => setModelMode('ai')}
              className={`px-3 py-1 rounded font-mono text-xs transition-colors ${
                modelMode === 'ai'
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_12px_rgba(255,179,0,0.3)]'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              IMD AI-Corrected
            </button>
            <button
              onClick={() => setModelMode('delta')}
              className={`px-3 py-1 rounded font-mono text-xs transition-colors ${
                modelMode === 'delta'
                  ? 'bg-surface-container-high text-primary font-bold border border-primary/30'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              Difference (Delta)
            </button>
          </div>
        </div>

        {/* Lead Time Scrubber Pill Buttons */}
        <div className="flex flex-col gap-1">
          <span className="font-headline text-[10px] text-outline uppercase tracking-wider font-semibold">
            Forecast Horizon (Lead Time)
          </span>
          <div className="flex items-center bg-surface-container-lowest p-1 rounded-lg border border-surface-container-high">
            {['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 7'].map(d => (
              <button
                key={d}
                onClick={() => setLeadTime(d)}
                className={`px-3 py-1 rounded font-mono text-xs transition-all ${
                  leadTime === d
                    ? 'bg-surface-container-high text-primary font-bold border border-primary/40'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Atmospheric Layer Toggles */}
        <div className="flex flex-col gap-1">
          <span className="font-headline text-[10px] text-outline uppercase tracking-wider font-semibold">
            Synoptic Layer
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveLayer('rainfall')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs border ${
                activeLayer === 'rainfall'
                  ? 'bg-secondary-container/20 border-secondary text-secondary'
                  : 'bg-surface-container-lowest border-surface-container-high text-outline'
              }`}
            >
              Precipitation Rate
            </button>
            <button
              onClick={() => setActiveLayer('wind850')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs border ${
                activeLayer === 'wind850'
                  ? 'bg-secondary-container/20 border-secondary text-secondary'
                  : 'bg-surface-container-lowest border-surface-container-high text-outline'
              }`}
            >
              850 hPa Wind Field
            </button>
            <button
              onClick={() => setActiveLayer('cape')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs border ${
                activeLayer === 'cape'
                  ? 'bg-secondary-container/20 border-secondary text-secondary'
                  : 'bg-surface-container-lowest border-surface-container-high text-outline'
              }`}
            >
              CAPE Instability
            </button>
          </div>
        </div>
      </div>

      {/* Main Map + Side Telemetry Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3 flex flex-col gap-3 bg-surface-container-low p-4 rounded-xl border border-surface-container-high/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-sm text-on-surface">
                {leadTime} Accumulated Precipitation ({modelMode.toUpperCase()} Mode)
              </span>
              <span className="text-[10px] font-mono text-tertiary bg-tertiary/10 border border-tertiary/20 px-2 py-0.5 rounded">
                Resolution: 0.10° Gridded
              </span>
            </div>
            <span className="text-xs font-mono text-outline">
              Thresholds: {filteredDistricts.length} Active Targets
            </span>
          </div>

          <div className="w-full h-[560px]">
            <IndiaMeteorologicalMap
              districts={filteredDistricts}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={onSelectDistrict}
              modelView={modelMode}
            />
          </div>
        </div>

        {/* Right Info Deck */}
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80 flex flex-col gap-3">
            <span className="font-headline font-bold text-xs text-outline uppercase tracking-wider">
              Ensemble Spread &amp; Confidence
            </span>
            <div className="flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between p-2 rounded bg-surface-container-lowest border border-surface-container-high">
                <span className="text-outline">GFS / Open-Meteo Spread:</span>
                <span className="text-secondary font-bold">±18.4 mm</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-surface-container-lowest border border-surface-container-high">
                <span className="text-outline">ECMWF / AI Delta:</span>
                <span className="text-primary font-bold">-14.2 mm</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-surface-container-lowest border border-surface-container-high">
                <span className="text-outline">Brier Skill Score:</span>
                <span className="text-tertiary font-bold">0.82 (High)</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80 flex flex-col gap-3">
            <span className="font-headline font-bold text-xs text-outline uppercase tracking-wider">
              Threshold Display Filter
            </span>
            <div className="flex flex-col gap-2 text-xs font-mono">
              <label className="flex items-center justify-between p-2 rounded bg-surface-container-lowest border border-surface-container-high cursor-pointer">
                <span className="text-error font-semibold">&gt; 204.5 mm Extreme</span>
                <input
                  type="checkbox"
                  checked={thresholds.extreme}
                  onChange={e => setThresholds({ ...thresholds, extreme: e.target.checked })}
                  className="accent-primary-container"
                />
              </label>
              <label className="flex items-center justify-between p-2 rounded bg-surface-container-lowest border border-surface-container-high cursor-pointer">
                <span className="text-primary-container font-semibold">&gt; 115.6 mm Very Heavy</span>
                <input
                  type="checkbox"
                  checked={thresholds.veryHeavy}
                  onChange={e => setThresholds({ ...thresholds, veryHeavy: e.target.checked })}
                  className="accent-primary-container"
                />
              </label>
              <label className="flex items-center justify-between p-2 rounded bg-surface-container-lowest border border-surface-container-high cursor-pointer">
                <span className="text-primary-fixed-dim font-semibold">&gt; 64.5 mm Heavy</span>
                <input
                  type="checkbox"
                  checked={thresholds.heavy}
                  onChange={e => setThresholds({ ...thresholds, heavy: e.target.checked })}
                  className="accent-primary-container"
                />
              </label>
            </div>
          </div>

          {selectedDistrict && (
            <div className="p-4 rounded-xl bg-surface-container-low border border-primary/50 flex flex-col gap-2">
              <span className="font-headline font-bold text-xs text-primary uppercase tracking-wider">
                Active Selection: {selectedDistrict.name}
              </span>
              <p className="text-xs text-on-surface-variant font-mono">
                {selectedDistrict.state} ({selectedDistrict.region})
              </p>
              <div className="flex items-center justify-between font-mono text-xs pt-2 border-t border-surface-container-high">
                <span className="text-outline">Day 1 AI Corrected:</span>
                <span className="font-bold text-primary">{selectedDistrict.ai_corrected_mm} mm</span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-outline">Raw GFS NWP:</span>
                <span className="font-bold text-outline">{selectedDistrict.raw_rain_mm} mm</span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-outline">AI Delta:</span>
                <span className="font-bold text-secondary">{selectedDistrict.delta_mm} mm</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
