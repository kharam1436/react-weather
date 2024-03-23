import { Location, Weather, weatherFunctionName } from './common'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
export const getWeatherByLocation = async function (
  location: Location
): Promise<Weather> {
  const { latitude, longitude } = location

  const response = await fetch(
    `${weatherFunctionName}?lat=${latitude}&lon=${longitude}`
  )
  const data: Weather = await response.json()
  console.log(data)
  return data
}
