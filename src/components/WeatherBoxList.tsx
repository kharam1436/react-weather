import './WeatherBoxList.css'

type WeatherBoxListProps = {
  cityList: string[]
  setCurrentCity: (city: string) => void
}

export const WeatherBoxList = ({
  cityList,
  setCurrentCity,
}: WeatherBoxListProps) => {
  return (
    <div className="ciyt-list-buttons">
      {cityList.map((city, idx) => (
        <button key={idx} onClick={() => setCurrentCity(city)}>
          {city}
        </button>
      ))}
    </div>
  )
}
