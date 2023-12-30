import { useRef } from 'react'
import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  LatLng,
  MapViewProps,
  Marker,
  Polyline,
} from 'react-native-maps'

import { Car, FlagCheckered } from 'phosphor-react-native'
import { useTheme } from 'styled-components'

import { IconBox } from '../IconBox'

type MapProps = MapViewProps & {
  cordinates: LatLng[]
}

export function Map({ cordinates, ...rest }: MapProps) {
  const lastCordinate = cordinates[cordinates.length - 1]
  const mapRef = useRef<MapView>(null)

  const { COLORS } = useTheme()

  async function onMapLoaded() {
    if (cordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(['departure', 'arrival'], {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      })
    }
  }

  return (
    <MapView
      ref={mapRef}
      onMapLoaded={onMapLoaded}
      provider={PROVIDER_DEFAULT}
      style={{ width: '100%', height: 200 }}
      region={{
        latitude: lastCordinate.latitude,
        longitude: lastCordinate.longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      }}
      {...rest}
    >
      <Marker identifier='departure' coordinate={cordinates[0]}>
        <IconBox icon={Car} size='SMALL' />
      </Marker>

      {cordinates.length > 1 && (
        <>
          <Marker identifier='arrival' coordinate={lastCordinate}>
            <IconBox icon={FlagCheckered} size='SMALL' />
          </Marker>
          <Polyline
            coordinates={[...cordinates]}
            strokeColor={COLORS.GRAY_700}
            strokeWidth={7}
          />
        </>
      )}
    </MapView>
  )
}
