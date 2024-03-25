import type { Context } from '@netlify/functions'
import { Weather } from '../../src/utils/common'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export default async (req: Request, context: Context) => {
  const latitude: string | null = new URL(req.url).searchParams.get('lat')
  const longitude: string | null = new URL(req.url).searchParams.get('lon')
  const city: string | null = new URL(req.url).searchParams.get('city')
  const apiKey = Netlify.env.get('REACT_APP_OPENWEATHERMAP_API_KEY')

  if (apiKey === undefined) {
    return new Response('API Key not found', { status: 500 })
  }

  if (latitude !== null && longitude !== null) {
    const data = await getWeatherofLongitudeLatitude(
      latitude,
      longitude,
      apiKey
    )
    return new Response(JSON.stringify(data))
  } else if (city) {
    const data = await getWeatherByCity(city, apiKey)
    return new Response(JSON.stringify(data))
  }

  return new Response('Invalid Request', { status: 400 })
}
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const getWeatherofLongitudeLatitude = async function (
  latitude: string,
  longitude: string,
  apiKey: string
): Promise<Weather> {
  console.log(`${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)

  const response = await fetch(
    `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  )
  return await response.json()
}
const getWeatherByCity = async function (
  city: string,
  apiKey: string
): Promise<Weather> {
  const response = await fetch(`${BASE_URL}?q=${city}&appid=${apiKey}`)
  return await response.json()
}
