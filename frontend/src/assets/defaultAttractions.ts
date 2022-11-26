const pictureURL = 'https://pic.pimg.tw/anrine910070/1591550218-3199929553.jpg?fbclid=IwAR3ZMYFhHWd55JsFHi7C-15cS5mV7K985WarlLJF-RhVO4PUbhEAIlZxQOI'

const defaultAttractions: { [key: string]: Array<{ name: string, pictureURL: string }> } = {
  'taipei-city': [
    {
      name: '台北車站',
      pictureURL
    },
    {
      name: '華山1914文化創意產業園區',
      pictureURL
    },
    {
      name: '國家音樂廳',
      pictureURL
    },
    {
      name: '龍門客棧餃子館 (林森店)',
      pictureURL
    },
    {
      name: '興波咖啡旗艦店',
      pictureURL
    }
  ],
  'keelung-city': [{
    name: '彩色屋',
    pictureURL
  }]
}

export default defaultAttractions
