const WMO_CODES: Record<number, { condition: string; icon: string }> = {
  0: { condition: 'Clear sky', icon: '☀️' },
  1: { condition: 'Mainly clear', icon: '🌤️' },
  2: { condition: 'Partly cloudy', icon: '⛅' },
  3: { condition: 'Overcast', icon: '☁️' },
  45: { condition: 'Foggy', icon: '🌫️' },
  48: { condition: 'Rime fog', icon: '🌫️' },
  51: { condition: 'Light drizzle', icon: '🌦️' },
  53: { condition: 'Moderate drizzle', icon: '🌦️' },
  55: { condition: 'Dense drizzle', icon: '🌧️' },
  61: { condition: 'Slight rain', icon: '🌦️' },
  63: { condition: 'Moderate rain', icon: '🌧️' },
  65: { condition: 'Heavy rain', icon: '🌧️' },
  71: { condition: 'Slight snow', icon: '🌨️' },
  73: { condition: 'Moderate snow', icon: '🌨️' },
  75: { condition: 'Heavy snow', icon: '❄️' },
  80: { condition: 'Rain showers', icon: '🌦️' },
  81: { condition: 'Moderate showers', icon: '🌧️' },
  82: { condition: 'Violent showers', icon: '⛈️' },
  95: { condition: 'Thunderstorm', icon: '⛈️' },
  96: { condition: 'Thunderstorm with hail', icon: '⛈️' },
  99: { condition: 'Severe thunderstorm', icon: '⛈️' },
};

export interface LiveWeather {
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

const cache = new Map<string, { data: LiveWeather; ts: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function fetchLiveWeather(lat: number, lng: number): Promise<LiveWeather | null> {
  const key = `${lat.toFixed(2)},${lng.toFixed(2)}`;
  const cached = cache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    const c = json.current;
    const wmo = WMO_CODES[c.weather_code] || { condition: 'Unknown', icon: '🌡️' };

    const data: LiveWeather = {
      temp: Math.round(c.temperature_2m),
      condition: wmo.condition,
      icon: wmo.icon,
      humidity: c.relative_humidity_2m,
      windSpeed: c.wind_speed_10m,
    };

    cache.set(key, { data, ts: Date.now() });
    return data;
  } catch {
    return null;
  }
}
