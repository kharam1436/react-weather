import { Weather } from '../utils/common'

type WeatherBoxProps = {
  weather: Weather | null
}
export const WeatherBox = ({ weather }: WeatherBoxProps) => {
  const city = weather?.name ?? 'No city found'
  const temperatureK = weather?.main.temp
  const temperatureC = temperatureK ? temperatureK - 273.15 : 0
  const temperatureF = temperatureK ? ((temperatureK - 273.15) * 9) / 5 + 32 : 0
  const temperatureCRound = Math.round(temperatureC * 100) / 100
  const temperatureFRound = Math.round(temperatureF * 100) / 100
  const description =
    weather?.weather[0].description ?? 'Please Grant location access'

  return (
    <>
      <p>{city}</p>
      <h1>
        {temperatureCRound}°C / {temperatureFRound}°F
      </h1>
      <h2>{description}</h2>
    </>
  )
}
