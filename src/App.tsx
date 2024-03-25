import { useEffect, useState } from 'react'
import './App.css'
import { WeatherBox } from './components/WeatherBox'
import { WeatherBoxList } from './components/WeatherBoxList'
import { Weather } from './utils/common'
import { getLocation } from './utils/location'
import { getWeatherByCity, getWeatherByLocation } from './utils/weather'

function App() {
  const locationList = ['current city', 'Paris', 'Seoul', 'London']
  const [currectCity, setCurrentCity] = useState<string>('current city')
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(true)
  let [color, setColor] = useState('#ffffff')

  useEffect(() => {
    if (currectCity === 'current city') {
      getLocation().then(getWeatherByLocation).then(setWeather)
    } else {
      getWeatherByCity(currectCity).then(setWeather)
    }
  }, [currectCity])
  return (
    <div className="App">
      <div className="weather-box">
        <WeatherBox city={currectCity} weather={weather} />
        <WeatherBoxList
          cityList={locationList}
          setCurrentCity={setCurrentCity}
        ></WeatherBoxList>
      </div>
    </div>
  )
}

export default App
