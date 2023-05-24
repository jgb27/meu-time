interface League {
  id: number,
  name: string,
  logo: string
}

const leagues: League[] = []

export const GetCoutries = async (api: string) => {
  const response = await fetch("https://v3.football.api-sports.io/countries", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": api
    }
  })

  const data = await response.json()
  return data.response
}

export const GetLeague = async (api: string, country: string) => {
  const response = await fetch(`https://v3.football.api-sports.io/leagues?code=${country}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": api
    }
  })

  const data = await response.json()
  console.log(data)

  data.response.forEach((league: any) => {
    leagues.push({
      id: league.league.id,
      name: league.league.name,
      logo: league.league.logo
    })
  }
  )

  return leagues
}