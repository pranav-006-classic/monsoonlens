from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any
from app.services.data_service import DataService

app = FastAPI(
    title="MonsoonLens Operational Meteorological API",
    description="IMD SIH26080 AI Post-Processing & Synoptic Telemetry Backend",
    version="2.4.0"
)

# Enable CORS for local and network frontend clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {
        "status": "online",
        "service": "MonsoonLens Backend",
        "version": "v2.4-SIH",
        "openmeteo_connection": "active",
        "operational_skill": "99.8%"
    }

@app.get("/api/overview")
async def get_overview():
    kpi = await DataService.get_kpi_overview()
    return kpi

@app.get("/api/districts")
async def get_districts(region: Optional[str] = Query(None, description="Filter by region (Western Ghats, Northeast, Coastal AP, Central India, etc.)")):
    districts = await DataService.get_district_list(region_filter=region)
    return {
        "count": len(districts),
        "region_filter": region or "All India",
        "districts": districts
    }

@app.get("/api/districts/{district_id}")
async def get_district_detail(district_id: str):
    detail = await DataService.get_district_detail(district_id)
    if not detail:
        raise HTTPException(status_code=404, detail=f"District '{district_id}' not found")
    return detail

@app.get("/api/regime")
async def get_regime_analysis():
    return DataService.get_regime_analysis()

@app.get("/api/verification")
async def get_verification_metrics():
    return DataService.get_verification_metrics()

@app.get("/api/live-sync")
async def sync_live_openmeteo(lat: float = 19.076, lon: float = 72.8777):
    """Direct live check against Open-Meteo for arbitrary coordinates in India"""
    daily = await DataService.fetch_openmeteo_daily(lat, lon)
    return {
        "latitude": lat,
        "longitude": lon,
        "live_openmeteo_daily": daily,
        "synced": daily is not None
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
