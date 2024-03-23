import { Location, NetlifyLocation } from './common'

// getting website URL
const protocol = window.location.protocol
const hostname = window.location.hostname
const port = window.location.port
const basesURL = `${protocol}//${hostname}${port ? `:${port}` : ''}/.netlify/functions`
const functionName = 'location'

console.log(`${basesURL}/${functionName}`)
export const getLocationFromNetlify = async function (): Promise<Location> {
  console.log('getLocationFromNetlify')
  const response = await fetch(`${basesURL}/${functionName}`)
  const data: NetlifyLocation = await response.json()
  console.log(data)
  return { latitude: data.latitude, longitude: data.longitude }
}

const positionSuccess = function (position: GeolocationPosition): Location {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  return { latitude, longitude }
}

const positionFailed = async function (): Promise<Location> {
  console.log('User not granted the permission for Geolocation')
  return await getLocationFromNetlify()
}
const getCoordinates = async function (): Promise<Location> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(positionSuccess(position))
      },
      (reject) => {
        resolve(positionFailed())
      }
    )
  })
}

const isBrowsserGeoLocationGranted = async function (): Promise<boolean> {
  const granted = await navigator.permissions.query({ name: 'geolocation' })
  return granted.state === 'granted'
}

export const getLocation = async function (): Promise<Location> {
  if (navigator.geolocation && (await isBrowsserGeoLocationGranted())) {
    // navigator.geolocation.getCurrentPosition(success, error, options)
    console.log('Geolocation is supported')
    return await getCoordinates()
  } else {
    console.log('Geolocation is not supported by Browser')
    return await getLocationFromNetlify()
  }
}
