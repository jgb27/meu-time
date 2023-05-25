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