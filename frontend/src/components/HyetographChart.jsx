import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

export default function HyetographChart({ hourlySeries = [] }) {
  if (!hourlySeries || hourlySeries.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-outline font-mono text-sm">
        Select a district to view 24h precipitation hyetograph
      </div>
    );
  }

  // Format data for Recharts
  const chartData = hourlySeries.map(item => ({
    time: item.time.replace(" IST", ""),
    raw_nwp: item.raw_mm,
    ai_corrected: item.ai_mm,
    climatology: item.climatology_mm,
    cape: item.cape
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface-container-high border border-outline-variant p-2.5 rounded-lg shadow-xl text-xs font-mono">
          <p className="text-primary font-bold mb-1">{label} IST</p>
          <div className="flex flex-col gap-1">
            <p className="text-[#FFB300]">
              <span className="font-semibold">AI Corrected:</span> {payload[0]?.value} mm/h
            </p>
            <p className="text-[#93CCFF]">
              <span className="font-semibold">Raw NWP GFS:</span> {payload[1]?.value} mm/h
            </p>
            <p className="text-outline">
              <span className="font-semibold">Climatology:</span> {payload[2]?.value} mm/h
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2C2A26" vertical={false} />
          <XAxis
            dataKey="time"
            stroke="#9E8E78"
            tick={{ fontSize: 10, fill: '#9E8E78', fontFamily: 'JetBrains Mono' }}
            interval={3}
          />
          <YAxis
            stroke="#9E8E78"
            tick={{ fontSize: 10, fill: '#9E8E78', fontFamily: 'JetBrains Mono' }}
            unit=" mm"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono', paddingTop: '8px' }}
            formatter={(value) => {
              if (value === 'ai_corrected') return <span className="text-[#FFB300]">IMD AI-Corrected (MonsoonLens)</span>;
              if (value === 'raw_nwp') return <span className="text-[#93CCFF]">Raw NWP (GFS / Open-Meteo)</span>;
              return <span className="text-[#9E8E78]">Climatological Base</span>;
            }}
          />
          <Bar dataKey="ai_corrected" fill="#FFB300" opacity={0.85} radius={[2, 2, 0, 0]} barSize={8} />
          <Bar dataKey="raw_nwp" fill="#3198DC" opacity={0.4} radius={[2, 2, 0, 0]} barSize={8} />
          <Line type="monotone" dataKey="climatology" stroke="#9E8E78" strokeDasharray="4 4" dot={false} strokeWidth={1.5} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
