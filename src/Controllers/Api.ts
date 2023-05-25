/* eslint-disable @typescript-eslint/no-explicit-any */
interface League {
  id: number,
  name: string,
  logo: string,
  sessons?: number[]
}

interface Team {
  id: number,
  code: string,
  name: string,
  logo: string
}

interface Player {
  name: string,
  age: number,
  nationality: string,
}

const leagues: League[] = []
const teams: Team[] = []
const players: Player[] = []

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

export const GetLeague = async (api: string, country: string) => {
  const data = localStorage.getItem(`leagues: ${country}`)

  if (data && JSON.parse(data).length > 0) {
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
  if (data && JSON.parse(data).length > 0) {
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

    teams.push(...data.response.map((team: any) => {
      return {
        id: team.team.id,
        code: team.team.code,
        name: team.team.name,
        logo: team.team.logo
      }
    }))

    localStorage.setItem(`teams: ${league} ${season}`, JSON.stringify(teams))

    return teams
  }
}

export const GetTeamStatistic = async (api: string, team: number, season: number, league: number) => {
  const data = localStorage.getItem(`team: ${team} ${season} ${league}`)
  if (data && JSON.parse(data).length > 0) {
    console.log('Team statistic from cache')
    return JSON.parse(data)
  } else {
    console.log('Team statistic from API')
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
      lineups: data.response.lineups[0].formation,
      goals: {
        '0-15': data.response.goals.for.minute['0-15'],
        '16-30': data.response.goals.for.minute['16-30'],
        '31-45': data.response.goals.for.minute['31-45'],
        '46-60': data.response.goals.for.minute['46-60'],
        '61-75': data.response.goals.for.minute['61-75'],
        '76-90': data.response.goals.for.minute['76-90'],
        '91-105': data.response.goals.for.minute['91-105'],
        '106-120': data.response.goals.for.minute['106-120'],
      }
    }

    localStorage.setItem(`stat: ${team} ${season} ${league}`, JSON.stringify(stat))

    return stat
  }
}

export const GetTeamPlayers = async (api: string, team: number, season: number, league: number) => {
  const data = localStorage.getItem(`players: ${team} ${season} ${league}`)
  if (data && JSON.parse(data).length > 0) {
    console.log('Team players from cache')
    return JSON.parse(data)
  } else {
    console.log('Team players from API')
    const response = await fetch(`https://v3.football.api-sports.io/players?season=${season}&team=${team}&league=${league}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": api
      }
    })

    const data = await response.json()

    players.push(...data.response.map((player: any) => {
      return {
        name: player.player.name,
        age: player.player.age,
        nationality: player.player.nationality
      }
    }))

    localStorage.setItem(`players: ${team} ${season} ${league}`, JSON.stringify(players))

    return players
  }
}