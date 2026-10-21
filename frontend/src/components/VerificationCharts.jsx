import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export function SkillProgressionChart({ leadTimes = [] }) {
  const chartData = leadTimes.map(item => ({
    name: item.lead_time.split(" ")[0] + " " + item.lead_time.split(" ")[1],
    ets_ai: item.ets_ai,
    ets_raw: item.ets_raw,
    csi_ai: item.csi_ai,
    csi_raw: item.csi_raw
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2C2A26" vertical={false} />
          <XAxis dataKey="name" stroke="#9E8E78" tick={{ fontSize: 10, fill: '#9E8E78', fontFamily: 'JetBrains Mono' }} />
          <YAxis stroke="#9E8E78" tick={{ fontSize: 10, fill: '#9E8E78', fontFamily: 'JetBrains Mono' }} domain={[0, 1]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1C1A17', borderColor: '#38322B', borderRadius: '8px', fontSize: '11px', fontFamily: 'JetBrains Mono' }}
          />
          <Legend
            wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono', paddingTop: '6px' }}
            formatter={(val) => {
              if (val === 'ets_ai') return <span className="text-[#FFB300]">MonsoonLens AI (ETS)</span>;
              if (val === 'ets_raw') return <span className="text-[#93CCFF]">Raw NWP (ETS)</span>;
              if (val === 'csi_ai') return <span className="text-[#69F6B9]">MonsoonLens AI (CSI)</span>;
              return <span className="text-[#9E8E78]">Raw NWP (CSI)</span>;
            }}
          />
          <Line type="monotone" dataKey="ets_ai" stroke="#FFB300" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="ets_raw" stroke="#3198DC" strokeWidth={1.5} strokeDasharray="5 5" dot={{ r: 3 }} />
          <Line type="monotone" dataKey="csi_ai" stroke="#69F6B9" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="csi_raw" stroke="#9E8E78" strokeWidth={1.5} strokeDasharray="3 3" dot={{ r: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ThresholdCSIChart({ thresholds = [] }) {
  const chartData = thresholds.map(t => ({
    name: t.threshold.split(" ")[1] + " " + (t.threshold.split(" ")[2] || ""),
    ai_csi: t.ai_csi,
    raw_csi: t.raw_csi
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2C2A26" vertical={false} />
          <XAxis dataKey="name" stroke="#9E8E78" tick={{ fontSize: 10, fill: '#9E8E78', fontFamily: 'JetBrains Mono' }} />
          <YAxis stroke="#9E8E78" tick={{ fontSize: 10, fill: '#9E8E78', fontFamily: 'JetBrains Mono' }} domain={[0, 1]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1C1A17', borderColor: '#38322B', borderRadius: '8px', fontSize: '11px', fontFamily: 'JetBrains Mono' }}
          />
          <Legend
            wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono', paddingTop: '6px' }}
            formatter={(val) => {
              if (val === 'ai_csi') return <span className="text-[#FFB300]">MonsoonLens AI Skill</span>;
              return <span className="text-[#3198DC]">Raw NWP Baseline</span>;
            }}
          />
          <Bar dataKey="ai_csi" fill="#FFB300" radius={[3, 3, 0, 0]} barSize={24} />
          <Bar dataKey="raw_csi" fill="#3198DC" opacity={0.5} radius={[3, 3, 0, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
