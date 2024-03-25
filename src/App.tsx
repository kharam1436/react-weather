import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
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

  useEffect(() => {
    setLoading(true)
    if (currectCity === 'current city') {
      getLocation()
        .then(getWeatherByLocation)
        .then(setWeather)
        .then(() => setLoading(false))
    } else {
      getWeatherByCity(currectCity)
        .then(setWeather)
        .then(() => setLoading(false))
    }
  }, [currectCity])
  return (
    <div className="App">
      <div className="weather-box">
        {loading ? (
          <>
            <ClipLoader
              color="#ffffff"
              loading={loading}
              // cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </>
        ) : (
          <>
            <WeatherBox city={currectCity} weather={weather} />
            <WeatherBoxList
              cityList={locationList}
              setCurrentCity={setCurrentCity}
            ></WeatherBoxList>
          </>
        )}
      </div>
    </div>
  )
}

export default App
