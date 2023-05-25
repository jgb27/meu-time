/* eslint-disable @typescript-eslint/no-explicit-any */

import { IPlayer } from "../Interfaces/InterfaceResponseApi"

const players: IPlayer[] = []

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