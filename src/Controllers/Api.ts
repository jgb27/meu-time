interface League {
  id: number,
  name: string,
  logo: string,
  sessons?: number[]
}

const leagues: League[] = []

export const GetCoutries = async (api: string) => {
  const data = localStorage.getItem('countries')

  if (data) {
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

export const GetLeague = async (api: string, country: string) => {
  const data = localStorage.getItem(`leagues: ${country}`)

  if (data) {
    console.log('Leagues from cache')
    return JSON.parse(data)
  } else {
    console.log('Leagues from API')
    const response = await fetch(`https://v3.football.api-sports.io/leagues?code=${country}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": api
      }
    })

    const data = await response.json()

    data.response.forEach((league: any) => {
      leagues.push({
        id: league.league.id,
        name: league.league.name,
        logo: league.league.logo,
        sessons: league.seasons.map((season: any) => season.year)
      })
    })

    localStorage.setItem(`leagues: ${country}`, JSON.stringify(leagues))

    return leagues
  }
}

export const GetTeams = async (api: string, league: number, season: number) => {
  const data = localStorage.getItem(`teams: ${league} ${season}`)
  if (data) {
    console.log('Teams from cache')
    return JSON.parse(data)
  } else {
    console.log('Teams from api')
    const response = await fetch(`https://v3.football.api-sports.io/teams?league=${league}&season=${season}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": api
      }
    })

    const data = await response.json()

    localStorage.setItem(`teams: ${league} ${season}`, JSON.stringify(data.response))

    return data.response
  }
}

export const GetTeamStatistic = async (api: string, team: number, season: number, league: number) => {
  const data = localStorage.getItem(`team: ${team} ${season} ${league}`)
  if (data) {
    console.log('Team statistic from cache')
    return JSON.parse(data)
  } else {
    const response = await fetch(`https://v3.football.api-sports.io/teams/statistics?season=${season}&team=${team}&league=${league}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": api
      }
    })

    const data = await response.json()

    const stat = {
      games: data.response.fixtures.played.total,
      wins: data.response.fixtures.wins.total,
      draws: data.response.fixtures.draws.total,
      loses: data.response.fixtures.loses.total,
      lineups: data.response.lineups[0].formation
    }

    localStorage.setItem(`stat: ${team} ${season} ${league}`, JSON.stringify(stat))

    return stat
  }
}

export const GetTeamPlayers = async (api: string, team: number, season: number, league: number) => {
  const data = localStorage.getItem(`players: ${team} ${season} ${league}`)
  if (data) {
    console.log('Team players from cache')
    return JSON.parse(data)
  }else{
    console.log('Team players from API')
    const response = await fetch(`https://v3.football.api-sports.io/players?season=${season}&team=${team}&league=${league}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": api
      }
    })

    const data = await response.json()

    localStorage.setItem(`players: ${team} ${season} ${league}`, JSON.stringify(data.response))

    return data.response
  }
}