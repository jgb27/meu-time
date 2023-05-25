export const GetCoutries = async (api: string) => {
  const data = localStorage.getItem('countries')
  
  if (data && JSON.parse(data).length > 0) {
    console.log('Coutries from cache')
    return JSON.parse(data)
  } else {
    console.log('Coutries from api')
    const response = await fetch("https://v3.football.api-sports.io/countries", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": api
      }
    })

    const data = await response.json()
    localStorage.setItem('countries', JSON.stringify(data.response))

    return data.response
  }
}