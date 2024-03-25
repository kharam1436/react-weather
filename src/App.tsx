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
  let [color, setColor] = useState('#ffffff')

  const changeWeather = async function () {
    setLoading(true)
    if (currectCity === 'current city') {
      const w = await getLocation().then(getWeatherByLocation)
      setWeather(w)
    } else {
      const w = await getWeatherByCity(currectCity)
      setWeather(w)
    }
    setLoading(false)
  }

  useEffect(() => {
    changeWeather()
  }, [currectCity])
  return (
    <div className="App">
      <div className="weather-box">
        {loading ? (
          <>
            <ClipLoader
              color={color}
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
