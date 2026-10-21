# MonsoonLens · IMD Operational Meteorological Console
*(Ministry of Earth Sciences · IMD | SIH26080 AI Post-Processing Console)*

A high-density operational-grade meteorology workstation designed for atmospheric scientists, state disaster management authorities, and hydrological modelers monitoring the Indian monsoon.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS (customized with `DESIGN.md` dark mission-control palette), Leaflet & React-Leaflet (CartoDB Dark Matter tiles), Recharts (Hyetographs, Lead-Time Skill Progression, Threshold CSI, ROC Curves), Material Symbols Outlined.
- **Backend**: FastAPI (Python 3.14), Uvicorn, HTTPX, Pydantic.
- **Data Integration**:
  - Live **Open-Meteo API** integration for global NWP (GFS/ECMWF) precipitation, wind, CAPE, and 7-day daily forecasts.
  - **IMD & MOSDAC & data.gov.in** standardized classifications:
    - IMD Rainfall Thresholds: Light (<15.5mm), Moderate (15.6-64.4mm), Heavy (64.5-115.5mm), Very Heavy (115.6-204.4mm), Extreme (>204.5mm).
    - AI Post-Processing Bias Correction (CNN/ResNet model correcting Western Ghats orographic wet-bias and false alarms in foothills).
    - Synoptic Regime Tracking (Monsoon Trough axis coordinates & displacement, Bay of Bengal Low Pressure Area / Depression vortex tracking).
    - Operational verification workbench (ETS, CSI, POD, FAR, ROC curves).

## Project Structure
```
monsoonlens/
├── backend/
│   ├── app/
│   │   ├── main.py                     # FastAPI application & REST endpoints
│   │   ├── models.py                   # Pydantic schemas
│   │   └── services/
│   │       └── data_service.py         # Open-Meteo connector, IMD AI bias correction, synoptics
│   ├── venv/                           # Python virtual environment
│   └── test_api.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── IndiaMeteorologicalMap.jsx  # Leaflet GIS dark map with IMD alerts, troughs & vortices
│   │   │   ├── HyetographChart.jsx         # 24h hyetograph (Recharts)
│   │   │   └── VerificationCharts.jsx      # Skill progression & CSI threshold charts (Recharts)
│   │   ├── views/
│   │   │   ├── OverviewView.jsx            # Operational Cockpit overview
│   │   │   ├── ForecastView.jsx            # Lead time & atmospheric layer exploration
│   │   │   ├── DistrictExplorerView.jsx    # Search, region filtering, localized hyetograph & live sync
│   │   │   ├── RegimeView.jsx              # Monsoon Trough & Low Pressure System tracker
│   │   │   └── VerificationView.jsx        # Verification workbench & contingency matrix
│   │   ├── api.js                          # Client-side API service
│   │   ├── App.jsx                         # Shell, header & sidebar navigation
│   │   └── index.css                       # Leaflet dark overrides & Tailwind
│   ├── tailwind.config.js                  # Operational Monsoon Intelligence design tokens
│   └── index.html
├── stitch_monsoonlens_ui_dashboard_prompt/ # Original extracted design files & mockups
└── start.bat                               # One-click launcher script
```

## Running the Application
1. **FastAPI Backend**:
   ```bash
   cd backend
   .\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```
   API Docs: `http://127.0.0.1:8000/docs`

2. **React Frontend**:
   ```bash
   cd frontend
   npm run dev -- --host
   ```
   Web App: `http://localhost:5173/`
