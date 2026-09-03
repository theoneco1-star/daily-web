/**
 * Daily Helper (일상의도움) — App Data Manager
 * Fetches app data and categories dynamically from data/apps.json
 */
let appsData = [];
let categoriesData = [];

/**
 * Fetch data/apps.json asynchronously
 */
async function loadAppsData() {
  try {
    const response = await fetch("data/apps.json?v=" + Date.now(), { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    categoriesData = data.categories || [];
    appsData = data.apps || [];
    return data;
  } catch (error) {
    console.error("Failed to load apps data:", error);
    return { categories: [], apps: [] };
  }
}
