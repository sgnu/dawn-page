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
      color: '#378bf1',
      name: 'GitHub',
      shortForm: 'Gh',
      url: 'https://github.com'
    }
]

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
    locationData: '',
    useImperial: true
  }
}

export { bookmarks, settings }