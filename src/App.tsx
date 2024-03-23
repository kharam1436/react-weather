import { useEffect, useState } from 'react'
import './App.css'
import { WeatherBox } from './components/WeatherBox'
import { Weather } from './utils/common'
import { getLocation } from './utils/location'
import { getWeatherByLocation } from './utils/weather'

function App() {
  const [weather, setWeather] = useState<Weather | null>(null)
  useEffect(() => {
    getLocation().then(getWeatherByLocation).then(setWeather)
  }, [])
  return (
    <div className="App">
      <div className="weather-box">
        <WeatherBox weather={weather} />
      </div>
    </div>
  )
}

export default App
