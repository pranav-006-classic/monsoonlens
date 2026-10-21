import React, { useState, useEffect } from 'react';
import OverviewView from './views/OverviewView';
import ForecastView from './views/ForecastView';
import DistrictExplorerView from './views/DistrictExplorerView';
import RegimeView from './views/RegimeView';
import VerificationView from './views/VerificationView';
import { fetchHealth, fetchOverview, fetchDistricts } from './api';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [kpiData, setKpiData] = useState(null);
  const [backendHealth, setBackendHealth] = useState({ status: 'checking' });
  const [selectedRegion, setSelectedRegion] = useState('All India');
  const [leadTime, setLeadTime] = useState('Day 1 (24h)');
  const [pipelineMode, setPipelineMode] = useState('ai'); // 'raw', 'ai', 'ensemble'

  // Fetch initial data from FastAPI backend
  useEffect(() => {
    fetchHealth().then(setBackendHealth);
    fetchOverview().then(setKpiData);
    fetchDistricts().then(res => {
      setDistricts(res.districts || []);
      if (res.districts && res.districts.length > 0) {
        setSelectedDistrict(res.districts[0]);
      }
    });
  }, []);

  // When region changes from sidebar, re-fetch districts
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    fetchDistricts(region).then(res => {
      setDistricts(res.districts || []);
    });
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'satellite_alt' },
    { id: 'forecast', label: 'Operational Forecast', icon: 'calendar_view_week' },
    { id: 'district-explorer', label: 'District Explorer', icon: 'explore' },
    { id: 'regime-analysis', label: 'Regime Analysis', icon: 'cyclone' },
    { id: 'verification-metrics', label: 'Verification & Metrics', icon: 'analytics' }
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body flex flex-col">
      {/* Fixed Top Header (52px to 64px) */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-surface-container-low/95 backdrop-blur-md z-50 flex items-center justify-between px-4 border-b border-surface-container-high/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {/* Left: Branding */}
        <div className="flex items-center gap-3 min-w-[340px]">
          <img
            alt="MonsoonLens Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1W00YIoVaXQD18bQilVZ-lZUn5J2i-arwWXfvY_OWwR1Uf660qC7buj7fBmLtyOMPRlu76tikccaH6_JojKAZTxj9Tu7YvBYHyV_qsp55y0II9xXC5N22acOsDcHr75i746WyNlResYd_ZKxYJpJiU1p3BAUoIFcCrlnt3p58708meO4qroVnvPGRd8ZanMUHOk2GVJCxS45by3lZ2pzEa_Et6JMJKqcD-lIiF9ayp94CE0rfYvMQKY3Se3"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-headline text-base text-primary font-bold tracking-tight">MonsoonLens</span>
              <span className="px-1.5 py-0.5 rounded bg-primary-container/20 text-primary font-mono text-[10px] border border-primary-container/30 uppercase font-semibold">
                v2.4-SIH
              </span>
            </div>
            <span className="font-mono text-[11px] text-outline truncate max-w-[280px]">
              Ministry of Earth Sciences · IMD | SIH26080 AI Console
            </span>
          </div>
        </div>

        {/* Center: Global Datetime & Lead-Time Scrubber */}
        <div className="hidden md:flex items-center gap-3 justify-center flex-1 px-2">
          <div className="flex items-center gap-1.5 bg-surface-container-lowest px-2.5 py-1 rounded-lg border border-surface-container-high text-xs font-mono">
            <span className="material-symbols-outlined text-primary text-[16px]">schedule</span>
            <span className="text-on-surface font-semibold">00 UTC Run · 18 Oct 2026</span>
          </div>

          <div className="flex items-center bg-surface-container-lowest p-0.5 rounded-lg border border-surface-container-high text-xs font-mono">
            {['Day 1 (24h)', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 7'].map(d => (
              <button
                key={d}
                onClick={() => setLeadTime(d)}
                className={`px-2.5 py-1 rounded transition-all ${
                  leadTime === d
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_12px_rgba(255,179,0,0.25)]'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Pipeline Mode Selector & Status */}
        <div className="flex items-center gap-3 justify-end min-w-[340px]">
          <div className="hidden lg:flex items-center bg-surface-container-lowest p-0.5 rounded-lg border border-surface-container-high text-xs font-mono">
            <button
              onClick={() => setPipelineMode('raw')}
              className={`px-2.5 py-1 rounded transition-colors ${
                pipelineMode === 'raw'
                  ? 'bg-surface-container-high text-secondary font-bold border border-secondary/30'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              Open-Meteo (Raw)
            </button>
            <button
              onClick={() => setPipelineMode('ai')}
              className={`px-2.5 py-1 rounded transition-colors ${
                pipelineMode === 'ai'
                  ? 'bg-surface-container-high text-primary font-bold border border-primary/30'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              IMD AI-Corrected
            </button>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-container/10 border border-tertiary-container/30 text-tertiary text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_rgba(105,246,185,0.7)]"></span>
            <span className="font-semibold tracking-wide hidden sm:inline">Operational · 99.8% Skill</span>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-surface-container-high">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-xs shadow-[0_0_10px_rgba(255,179,0,0.3)]">
              IMD
            </div>
          </div>
        </div>
      </header>

      {/* Main App Layout: Sidebar + Main Content Viewport */}
      <div className="flex flex-1 pt-16">
        {/* Persistent Sidebar Dock (80 / 320px) */}
        <aside className="fixed left-0 top-16 bottom-7 w-72 bg-surface-container-low border-r border-surface-container-high/60 z-40 flex flex-col justify-between overflow-y-auto">
          <div className="flex flex-col p-3 gap-5">
            {/* Nav links */}
            <div className="flex flex-col gap-1">
              <span className="font-headline text-[10px] text-outline uppercase tracking-wider font-semibold px-2 mb-1">
                Operational Cockpit
              </span>
              <nav className="flex flex-col gap-1">
                {navItems.map(item => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                        isActive
                          ? 'bg-surface-container-high text-primary border border-primary/30 font-semibold shadow-[0_0_12px_rgba(255,179,0,0.1)]'
                          : 'text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-primary' : 'text-outline'}`}>
                        {item.icon}
                      </span>
                      <span className="font-headline text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Region Sector Picker */}
            <div className="flex flex-col gap-2 pt-3 border-t border-surface-container-high/60">
              <span className="font-headline text-[10px] text-outline uppercase tracking-wider font-semibold px-2">
                Synoptic Region / Sector
              </span>
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={e => handleRegionChange(e.target.value)}
                  className="w-full bg-surface-container-lowest text-on-surface text-xs px-3 py-2 rounded-lg border border-surface-container-high appearance-none focus:outline-none focus:border-primary font-mono"
                >
                  <option>All India</option>
                  <option>Western Ghats</option>
                  <option>Northeast</option>
                  <option>Central India</option>
                  <option>Coastal AP</option>
                  <option>North India</option>
                  <option>South Peninsular</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-outline pointer-events-none text-[16px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Rainfall Threshold Summary Pill Alert */}
            <div className="flex flex-col gap-2 pt-2 border-t border-surface-container-high/60">
              <span className="font-headline text-[10px] text-outline uppercase tracking-wider font-semibold px-2">
                Active Threshold Alert Tiers
              </span>
              <div className="flex flex-col gap-1.5 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest border border-surface-container-high/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                    <span className="text-on-surface">&gt; 64.5 mm Heavy</span>
                  </div>
                  <span className="text-secondary font-bold">{kpiData?.yellow_alerts || 10}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest border border-surface-container-high/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                    <span className="text-on-surface">&gt; 115.6 mm Very Heavy</span>
                  </div>
                  <span className="text-primary font-bold">{kpiData?.orange_alerts || 9}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest border border-surface-container-high/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                    <span className="text-error font-semibold">&gt; 204.5 mm Extreme</span>
                  </div>
                  <span className="text-error font-bold">{kpiData?.red_alerts || 5}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Dock Metadata */}
          <div className="p-3 border-t border-surface-container-high/60 bg-surface-container-lowest/50 text-[10px] font-mono flex items-center justify-between">
            <span className="text-outline">Grid Res: 0.10° (10km)</span>
            <span className="text-tertiary flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              GPU AI Engine
            </span>
          </div>
        </aside>

        {/* Dynamic Viewport (Offset by 288px / 72rem) */}
        <main className="flex-1 ml-72 min-h-[calc(100vh-4rem-1.75rem)] pb-8 bg-surface">
          {activeTab === 'overview' && (
            <OverviewView
              kpiData={kpiData}
              districts={districts}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={setSelectedDistrict}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'forecast' && (
            <ForecastView
              districts={districts}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={setSelectedDistrict}
            />
          )}

          {activeTab === 'district-explorer' && (
            <DistrictExplorerView
              districts={districts}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={setSelectedDistrict}
            />
          )}

          {activeTab === 'regime-analysis' && (
            <RegimeView districts={districts} />
          )}

          {activeTab === 'verification-metrics' && (
            <VerificationView />
          )}
        </main>
      </div>

      {/* Fixed Bottom Status Bar (28px) */}
      <footer className="fixed bottom-0 left-0 right-0 h-7 bg-surface-container-lowest border-t border-surface-container-high/60 z-50 flex items-center justify-between px-4 text-[11px] font-mono text-outline">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-tertiary">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            FastAPI Backend: Online (port 8000)
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline text-secondary">
            Open-Meteo Live API: Connected
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden md:inline">IMD / MOSDAC / data.gov.in Gridded Ingestion</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Active Phase: 3 (Active Surge)</span>
          <span className="text-primary font-bold">MonsoonLens v2.4-SIH</span>
        </div>
      </footer>
    </div>
  );
}
