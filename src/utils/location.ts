import { Location, locationFunctionName, NetlifyLocation } from './common'

export const getLocationFromNetlify = async function (): Promise<Location> {
  console.log('getLocationFromNetlify')
  const response = await fetch(`${locationFunctionName}`)
  const data: NetlifyLocation = await response.json()
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    fromBrowser: false,
  }
}

/**
 * Get the coordinates of the user
 * @param position position success, contains the coordinates
 * @returns Location
 */
const positionSuccess = function (position: GeolocationPosition): Location {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  return { latitude, longitude, fromBrowser: true }
}

const positionFailed = async function (): Promise<Location> {
  console.log('User not granted the permission for Geolocation')
  return await getLocationFromNetlify()
}

/**
 * Get the coordinates of the user
 * @returns Location
 */
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

/**
 * Get the location of the user
 * @returns Location
 */
export const getLocation = async function (): Promise<Location> {
  if (navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition(success, error, options)
    console.log('Geolocation is supported')
    return await getCoordinates()
  } else {
    console.log('Geolocation is not supported by Browser')
    return await getLocationFromNetlify()
  }
}
