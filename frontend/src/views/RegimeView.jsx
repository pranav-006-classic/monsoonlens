import React, { useState, useEffect } from 'react';
import IndiaMeteorologicalMap from '../components/IndiaMeteorologicalMap';
import { fetchRegimeAnalysis } from '../api';

export default function RegimeView({ districts }) {
  const [regime, setRegime] = useState(null);

  useEffect(() => {
    fetchRegimeAnalysis().then(data => setRegime(data));
  }, []);

  return (
    <div className="flex flex-col gap-5 p-4 lg:p-6">
      {/* Top Banner: Regime Classification */}
      <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary-container/40 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[24px]">cyclone</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-headline font-bold text-lg text-primary">
                {regime?.current_regime || "ACTIVE MONSOON · PHASE 3"}
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-tertiary/15 border border-tertiary/30 text-tertiary font-bold">
                {regime?.confidence || 94.2}% AI Confidence
              </span>
            </div>
            <span className="text-xs font-mono text-outline">
              IMD Synoptic Working Group · Trough Displaced South of Normal Position
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex flex-col text-right">
            <span className="text-outline">MJO Phase:</span>
            <span className="text-on-surface font-semibold">{regime?.mjo_phase || "Phase 4 (Maritime Continent)"}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-outline">Moisture Convergence:</span>
            <span className="text-secondary font-semibold">{regime?.moisture_flux || "SW Flow 35-45 knots"}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Map (Left) & Synoptic Bulletin + Vortex Deck (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Map with Troughs & Vortices (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3 bg-surface-container-low p-4 rounded-xl border border-surface-container-high/80">
          <div className="flex items-center justify-between">
            <span className="font-headline font-bold text-xs text-outline uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">radar</span>
              Synoptic Map: Monsoon Trough Axis &amp; Low Pressure Systems
            </span>
            <span className="text-[10px] font-mono text-primary bg-primary-container/10 border border-primary/20 px-2 py-0.5 rounded">
              Overlay Active
            </span>
          </div>

          <div className="w-full h-[520px]">
            <IndiaMeteorologicalMap
              districts={districts}
              showRegimeLayers={true}
              regimeData={regime}
              modelView="ai"
            />
          </div>
        </div>

        {/* Right Telemetry & Bulletins (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Official IMD Synoptic Bulletin */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80 flex flex-col gap-2">
            <span className="font-headline font-bold text-xs text-primary uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">newspaper</span>
              Operational Synoptic Meteorology Bulletin
            </span>
            <p className="text-xs text-on-surface-variant font-mono leading-relaxed bg-surface-container-lowest p-3 rounded-lg border border-surface-container-high">
              {regime?.synoptic_bulletin || "Loading bulletin..."}
            </p>
          </div>

          {/* Low Pressure Vortex Telemetry */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80 flex flex-col gap-3">
            <span className="font-headline font-bold text-xs text-outline uppercase tracking-wider">
              Identified Cyclonic Vortices &amp; Low Pressure Systems (LPS)
            </span>
            {regime?.vortices?.map(v => (
              <div key={v.id} className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container-high flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-sm text-error flex items-center gap-1">
                    🌀 {v.name}
                  </span>
                  <span className="text-[10px] font-mono text-error bg-error/15 px-2 py-0.5 rounded">
                    {v.pressure_hpa} hPa
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-on-surface-variant">
                  <div>
                    <span className="text-outline text-[10px] block">INTENSITY</span>
                    <span className="text-on-surface font-semibold">{v.intensity}</span>
                  </div>
                  <div>
                    <span className="text-outline text-[10px] block">TRAJECTORY</span>
                    <span className="text-secondary font-semibold">{v.movement_dir}</span>
                  </div>
                  <div>
                    <span className="text-outline text-[10px] block">CENTER COORDINATES</span>
                    <span className="text-on-surface">{v.lat}°N, {v.lon}°E</span>
                  </div>
                  <div>
                    <span className="text-outline text-[10px] block">PROJECTED LANDFALL</span>
                    <span className="text-primary font-semibold">Odisha / WB Coast (T+24h)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trough Coordinates Summary */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80 flex flex-col gap-2">
            <span className="font-headline font-bold text-xs text-outline uppercase tracking-wider">
              Active Trough Coordinates
            </span>
            <div className="flex flex-col gap-1.5 text-xs font-mono">
              {regime?.troughs?.map((t, idx) => (
                <div key={idx} className="p-2 rounded bg-surface-container-lowest border border-surface-container-high flex items-center justify-between">
                  <span className={idx === 0 ? "text-primary font-semibold" : "text-secondary font-semibold"}>
                    {t.name}
                  </span>
                  <span className="text-outline">{t.displacement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
