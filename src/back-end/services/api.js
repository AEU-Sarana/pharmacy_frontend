// Lightweight API client for backend integration on the dashboard

const DEFAULT_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || "/api";

async function httpRequest(path, options = {}) {
  const url = `${DEFAULT_BASE_URL}${path}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const response = await fetch(url, { ...options, headers });
  const isJson = (response.headers.get("content-type") || "").includes("application/json");
  const body = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = body?.message || response.statusText || "Request failed";
    throw new Error(message);
  }
  return body;
}

export const dashboardApi = {
  async getStats() {
    // Expected response: [{ title, value, change, trend, subtitle, iconKey }]
    return httpRequest("/dashboard/stats", { method: "GET" });
  },
  async getSales() {
    // Expected response: [{ month, value }]
    return httpRequest("/dashboard/sales", { method: "GET" });
  },
  async getTopMedicines() {
    // Expected response: [{ name, sales, amount, percentage, color }]
    return httpRequest("/dashboard/top-medicines", { method: "GET" });
  },
  async getStockAlerts() {
    // Expected response: [{ name, status, qty, type: 'low'|'expiring' }]
    return httpRequest("/dashboard/stock-alerts", { method: "GET" });
  },
  async getLatestOrders() {
    // Expected response: [{ id, customer, price, status, date }]
    return httpRequest("/dashboard/latest-orders", { method: "GET" });
  },
};

export default dashboardApi;



