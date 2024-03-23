import { Location } from './common'

const getCoordinates = async function (): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export const getLocation = async function (): Promise<Location> {
  if (navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition(success, error, options)
    const position = await getCoordinates()
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    return { latitude, longitude }
  }

  console.log('returning default location')
  return { latitude: 0, longitude: 0 }
}
