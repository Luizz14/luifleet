import * as dotenv from 'dotenv'

dotenv.config()

module.exports = {
  expo: {
    name: 'luifleet',
    slug: 'luifleet',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#202024',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.luiz.luifleet',
      infoPlist: {
        UIBackgroundModes: ['location', 'fetch'],
        NSLocationAlwaysAndWhenInUseUsageDescription:
          'Allows App to use location services in the foreground and background.',
        NSFaceIDUsageDescription:
          'Allows App to use Face ID for a simpler sign in.',
      },
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#202024',
      },
      package: 'com.luiz.luifleet',
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission:
            'Allow $(PRODUCT_NAME) to use your location.',
        },
      ],
    ],
  },
}
