from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class DistrictItem(BaseModel):
    id: str
    name: str
    state: str
    region: str
    lat: float
    lon: float
    station_code: str
    raw_rain_mm: float
    ai_corrected_mm: float
    delta_mm: float
    alert_level: str  # "green", "yellow", "orange", "red"
    alert_label: str  # "Normal", "Heavy", "Very Heavy", "Extreme"
    risk_score: int   # 0 to 100
    confidence_pct: float

class HourlyForecast(BaseModel):
    time: str
    raw_mm: float
    ai_mm: float
    climatology_mm: float
    wind_speed_850: float
    cape: float

class DailyForecast(BaseModel):
    date: str
    lead_time: str
    raw_mm: float
    ai_mm: float
    ensemble_spread_min: float
    ensemble_spread_max: float
    alert_level: str

class DistrictDetail(DistrictItem):
    subdivision: str
    synoptic_influence: str
    hourly_series: List[HourlyForecast]
    daily_series: List[DailyForecast]
    soil_moisture_index: float
    flood_warning_tier: str
    station_bias_historic: float

class KPIOverview(BaseModel):
    heavy_alert_districts: int
    total_districts_monitored: int
    delta_vs_raw: int
    red_alerts: int
    orange_alerts: int
    yellow_alerts: int
    active_regime: str
    regime_confidence: float
    regime_description: str
    mean_ai_bias_delta: float
    skill_score: float
    last_run_timestamp: str

class SynopticVortex(BaseModel):
    id: str
    name: str
    lat: float
    lon: float
    pressure_hpa: float
    intensity: str
    category: str
    movement_dir: str
    track_history: List[Dict[str, float]]
    projected_track: List[Dict[str, float]]

class SynopticTrough(BaseModel):
    name: str
    status: str
    coordinates: List[List[float]]
    displacement: str

class RegimeAnalysisData(BaseModel):
    current_regime: str
    phase: str
    confidence: float
    troughs: List[SynopticTrough]
    vortices: List[SynopticVortex]
    low_pressure_areas: List[Dict[str, Any]]
    moisture_flux: str
    divergence_index: float
    mjo_phase: str
    mjo_amplitude: float
    synoptic_bulletin: str

class MetricLeadTime(BaseModel):
    lead_time: str
    ets_raw: float
    ets_ai: float
    csi_raw: float
    csi_ai: float
    pod_raw: float
    pod_ai: float
    far_raw: float
    far_ai: float
    bias_reduction_pct: float

class VerificationSummary(BaseModel):
    mean_ets_improvement: float
    false_alarm_reduction_pct: float
    orographic_bias_fix_pct: float
    lead_times: List[MetricLeadTime]
    threshold_metrics: List[Dict[str, Any]]
    roc_points_raw: List[Dict[str, float]]
    roc_points_ai: List[Dict[str, float]]
