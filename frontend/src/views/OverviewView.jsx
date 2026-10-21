import React from 'react';
import IndiaMeteorologicalMap from '../components/IndiaMeteorologicalMap';

export default function OverviewView({
  kpiData,
  districts,
  selectedDistrict,
  onSelectDistrict,
  onNavigateTab
}) {
  const highAlertDistricts = districts.filter(d => d.alert_level === 'red' || d.alert_level === 'orange').slice(0, 8);

  return (
    <div className="flex flex-col gap-5 p-4 lg:p-6">
      {/* 4 KPI Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Metric 1: Heavy-Rain Alert Districts */}
        <div className="flex flex-col justify-between p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80 relative overflow-hidden group">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="font-headline text-[11px] text-outline uppercase tracking-wider font-semibold">
              Districts Under Heavy Alert (&gt;64.5mm)
            </span>
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-error/15 border border-error/30 text-error text-[11px] font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
              {kpiData?.delta_vs_raw || -12} vs Raw GFS
            </span>
          </div>
          <div className="flex items-baseline gap-2 my-1">
            <span className="font-mono text-3xl text-on-surface font-bold">
              {kpiData?.heavy_alert_districts || 24}
            </span>
            <span className="font-mono text-xs text-outline">
              / {kpiData?.total_districts_monitored || 38} Monitored
            </span>
          </div>
          <div className="flex items-center gap-1.5 pt-2 mt-2 border-t border-surface-container-high/60 text-xs font-mono">
            <span className="flex items-center gap-1 text-error bg-error/10 px-1.5 py-0.5 rounded">
              <strong className="font-bold">{kpiData?.red_alerts || 5}</strong> Red (&gt;204mm)
            </span>
            <span className="flex items-center gap-1 text-primary-container bg-primary-container/10 px-1.5 py-0.5 rounded">
              <strong className="font-bold">{kpiData?.orange_alerts || 9}</strong> Orange
            </span>
            <span className="flex items-center gap-1 text-primary-fixed-dim bg-primary-fixed-dim/10 px-1.5 py-0.5 rounded">
              <strong className="font-bold">{kpiData?.yellow_alerts || 10}</strong> Yellow
            </span>
          </div>
        </div>

        {/* Metric 2: Synoptic Regime Detection */}
        <div className="flex flex-col justify-between p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80 relative overflow-hidden">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="font-headline text-[11px] text-outline uppercase tracking-wider font-semibold">
              Monsoon Synoptic Regime
            </span>
            <span className="text-[11px] font-mono text-tertiary bg-tertiary/10 border border-tertiary/30 px-1.5 py-0.5 rounded font-semibold">
              {kpiData?.regime_confidence || 94.2}% Conf.
            </span>
          </div>
          <div className="flex items-center gap-2 my-1">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></span>
            <span className="font-headline text-base text-primary font-bold tracking-tight">
              {kpiData?.active_regime || "ACTIVE MONSOON · PHASE 3"}
            </span>
          </div>
          <p className="text-xs text-on-surface-variant truncate pt-2 mt-2 border-t border-surface-container-high/60" title={kpiData?.regime_description}>
            {kpiData?.regime_description || "Trough south of normal; cyclonic vortex NW Bay"}
          </p>
        </div>

        {/* Metric 3: Mean AI Bias Correction */}
        <div className="flex flex-col justify-between p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80 relative overflow-hidden">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="font-headline text-[11px] text-outline uppercase tracking-wider font-semibold">
              Mean AI Bias Correction
            </span>
            <span className="text-[11px] font-mono text-secondary bg-secondary-container/10 border border-secondary/20 px-1.5 py-0.5 rounded font-semibold">
              Wet Bias Fixed
            </span>
          </div>
          <div className="flex items-baseline gap-2 my-1">
            <span className="font-mono text-3xl text-secondary font-bold">
              {kpiData?.mean_ai_bias_delta || -14.2}
            </span>
            <span className="font-mono text-xs text-outline">mm/day mean delta</span>
          </div>
          <p className="text-xs text-on-surface-variant truncate pt-2 mt-2 border-t border-surface-container-high/60">
            Konkan orography &amp; foothill false alarms attenuated
          </p>
        </div>

        {/* Metric 4: Operational Verification Skill */}
        <div className="flex flex-col justify-between p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80 relative overflow-hidden">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="font-headline text-[11px] text-outline uppercase tracking-wider font-semibold">
              AI Verification Skill (ETS)
            </span>
            <span className="text-[11px] font-mono text-tertiary bg-tertiary/10 border border-tertiary/30 px-1.5 py-0.5 rounded font-semibold">
              +48.6% vs GFS
            </span>
          </div>
          <div className="flex items-baseline gap-2 my-1">
            <span className="font-mono text-3xl text-tertiary font-bold">0.67</span>
            <span className="font-mono text-xs text-outline">Day 1 CSI: 0.74</span>
          </div>
          <p className="text-xs text-on-surface-variant truncate pt-2 mt-2 border-t border-surface-container-high/60">
            Validated against 3,200+ AWS IMD telemetry stations
          </p>
        </div>
      </section>

      {/* Main Center Area: Map & Alert Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Map (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-3 bg-surface-container-low p-4 rounded-xl border border-surface-container-high/80">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-sm text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">map</span>
                Operational Synoptic GIS View · India Precipitation Overview
              </span>
              <span className="text-[10px] font-mono bg-surface-container-high text-outline px-1.5 py-0.5 rounded">
                Day 1 (24h Accumulated)
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-outline">Tile: CartoDB Dark Matter</span>
            </div>
          </div>

          <div className="w-full h-[520px]">
            <IndiaMeteorologicalMap
              districts={districts}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={onSelectDistrict}
              modelView="ai"
            />
          </div>
        </div>

        {/* Right High-Alert Feed & Synoptic Actions */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
              <span className="font-headline font-bold text-xs text-error flex items-center gap-1 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                Emergency &amp; High Risk Ticker
              </span>
              <button
                onClick={() => onNavigateTab('district-explorer')}
                className="text-[11px] font-mono text-primary hover:underline"
              >
                View All &rarr;
              </button>
            </div>

            <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-1">
              {highAlertDistricts.map(d => (
                <div
                  key={d.id}
                  onClick={() => onSelectDistrict(d)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    selectedDistrict?.id === d.id
                      ? 'bg-surface-container-high border-primary'
                      : 'bg-surface-container-lowest border-surface-container-high/70 hover:border-outline'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-headline font-semibold text-xs text-on-surface">{d.name}</span>
                    <span className="text-[10px] font-mono text-outline">{d.state} · {d.region}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs font-mono font-bold ${
                      d.alert_level === 'red' ? 'text-error' : 'text-primary-container'
                    }`}>
                      {d.ai_corrected_mm} mm
                    </span>
                    <span className="text-[9px] font-mono text-secondary">
                      {d.delta_mm > 0 ? `+${d.delta_mm}` : d.delta_mm} mm AI delta
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Synoptic Briefing Box */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/80 flex flex-col gap-2">
            <span className="font-headline font-bold text-xs text-primary flex items-center gap-1.5 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">cyclone</span>
              Synoptic Intelligence Note
            </span>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Monsoon Trough axis actively positioned south of normal alignment. Deep cyclonic circulation over NW Bay of Bengal is channeling intensified low-level moisture feeds into East &amp; Central India. High vulnerability indicated along the Konkan orographic crest and coastal Odisha.
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-surface-container-high">
              <button
                onClick={() => onNavigateTab('regime-analysis')}
                className="w-full py-1.5 px-3 rounded bg-surface-container-high hover:bg-surface-bright text-xs font-headline font-semibold text-primary transition-colors text-center"
              >
                Inspect Monsoon Regime &amp; Vortex Track &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
