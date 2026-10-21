import httpx

try:
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": 19.076,
        "longitude": 72.8777,
        "daily": "precipitation_sum",
        "timezone": "Asia/Kolkata"
    }
    r = httpx.get(url, params=params, timeout=10.0)
    print("Status:", r.status_code)
    print("Daily data:", r.json().get("daily"))
except Exception as e:
    print("Error:", e)
