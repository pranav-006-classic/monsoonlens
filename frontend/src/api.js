const API_BASE = "http://127.0.0.1:8000/api";

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error("Health check failed");
    return await res.json();
  } catch (err) {
    console.warn("Backend health error:", err);
    return { status: "offline", service: "Offline Mode" };
  }
}

export async function fetchOverview() {
  try {
    const res = await fetch(`${API_BASE}/overview`);
    if (!res.ok) throw new Error("Overview fetch failed");
    return await res.json();
  } catch (err) {
    console.error("Overview error:", err);
    return null;
  }
}

export async function fetchDistricts(region = "") {
  try {
    const url = region && region !== "All India" 
      ? `${API_BASE}/districts?region=${encodeURIComponent(region)}` 
      : `${API_BASE}/districts`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Districts fetch failed");
    return await res.json();
  } catch (err) {
    console.error("Districts error:", err);
    return { count: 0, districts: [] };
  }
}

export async function fetchDistrictDetail(districtId) {
  try {
    const res = await fetch(`${API_BASE}/districts/${districtId}`);
    if (!res.ok) throw new Error("District detail fetch failed");
    return await res.json();
  } catch (err) {
    console.error("District detail error:", err);
    return null;
  }
}

export async function fetchRegimeAnalysis() {
  try {
    const res = await fetch(`${API_BASE}/regime`);
    if (!res.ok) throw new Error("Regime fetch failed");
    return await res.json();
  } catch (err) {
    console.error("Regime error:", err);
    return null;
  }
}

export async function fetchVerificationMetrics() {
  try {
    const res = await fetch(`${API_BASE}/verification`);
    if (!res.ok) throw new Error("Verification fetch failed");
    return await res.json();
  } catch (err) {
    console.error("Verification error:", err);
    return null;
  }
}
