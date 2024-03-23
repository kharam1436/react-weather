// getting website URL
const protocol = window.location.protocol
const hostname = window.location.hostname
const port = window.location.port
export const basesURL = `${protocol}//${hostname}${port ? `:${port}` : ''}/.netlify/functions`
export const locationFunctionName = `${basesURL}/location`
export const weatherFunctionName = `${basesURL}/weather`

// location type
export type Location = { latitude: number; longitude: number }

// weather type
export type Weather = {
  coord: { lon: number; lat: number }
  weather: { id: number; main: string; description: string; icon: string }[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: { speed: number; deg: number }
  clouds: { all: number }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

// Netlify Location info
type Country = {
  code: string
  name: string
}

export type NetlifyLocation = {
  city: string
  country: Country
  subdivision: Country
  timezone: string
  latitude: number
  longitude: number
}
