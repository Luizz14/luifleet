import * as Location from 'expo-location'

export async function getAddressLocation({
  latitude,
  longitude,
}: Location.LocationObjectCoords) {
  try {
    const location = await Location.reverseGeocodeAsync({ latitude, longitude })

    if (location.length > 0) {
      const { street, city, region } = location[0]
      return `${street}, ${city}-${region}`
    } else {
      return null
    }
  } catch (error) {
    throw error
  }
}
