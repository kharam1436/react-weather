import { Location, Weather } from './common'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
export const getWeatherByLocation = async function (
  location: Location
): Promise<Weather> {
  const latitude = location.latitude
  const longitude = location.longitude
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY

  const response = await fetch(
    `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  )
  const data: Weather = await response.json()
  console.log(data)
  return data
}
