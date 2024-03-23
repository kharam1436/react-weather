import type { Context } from '@netlify/functions'
import { Weather } from '../../src/utils/common'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export default async (req: Request, context: Context) => {
  const latitude: string | null = new URL(req.url).searchParams.get('lat')
  const longitude: string | null = new URL(req.url).searchParams.get('lon')
  const apiKey = Netlify.env.get('REACT_APP_OPENWEATHERMAP_API_KEY')


  const response = await fetch(
    `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
  )
  const data: Weather = await response.json()


  return new Response(JSON.stringify(data))
}