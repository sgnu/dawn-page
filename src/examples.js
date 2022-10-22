const bookmarks = [
    {
        color: '#ff0000',
        name: 'Youtube',
        shortForm: 'Yt',
        url: 'https://youtube.com'
    },
    {
        color: '#00ff00',
        name: 'Google',
        shortForm: 'Ggl',
        url: 'https://google.com'
    },
    {
        color: '#ffff00',
        name: 'Duck Duck Go',
        shortForm: 'Ddg',
        url: 'https://duckduckgo.com'
    }
]

const weatherData = {
  "coord": {
    "lon": -75.1638,
    "lat": 39.9523
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 50.79,
    "feels_like": 49.33,
    "temp_min": 44.85,
    "temp_max": 54.77,
    "pressure": 1020,
    "humidity": 80
  },
  "visibility": 10000,
  "wind": {
    "speed": 4.61,
    "deg": 310
  },
  "clouds": {
    "all": 0
  },
  "dt": 1666360440,
  "sys": {
    "type": 2,
    "id": 2037403,
    "country": "US",
    "sunrise": 1666351035,
    "sunset": 1666390378
  },
  "timezone": -14400,
  "id": 4560349,
  "name": "Philadelphia",
  "cod": 200
}

const settings = {
  clock: {
    enabled: true,
    twentyFourHours: true,
    showSeconds: true
  },
  notes: {
    enabled: true,
  },
  weather: {
    enabled: true,
    apiKey: '',
    locationData: ''
  }
}

export { bookmarks, weatherData, settings }