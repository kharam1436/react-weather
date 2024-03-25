import { Location, Weather, weatherFunctionName } from './common'

export const getWeatherByLocation = async function (
  location: Location
): Promise<Weather> {
  const { latitude, longitude, fromBrowser } = location

  const response = await fetch(
    `${weatherFunctionName}?lat=${latitude}&lon=${longitude}`
  )
  const data: Weather = { ...(await response.json()), fromBrowser }
  return data
}

export const getWeatherByCity = async function (
  city: string
): Promise<Weather> {
  const response = await fetch(`${weatherFunctionName}?city=${city}`)
  const data: Weather = { ...(await response.json()), fromBrowser: false }
  return data
}
