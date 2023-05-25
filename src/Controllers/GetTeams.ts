/* eslint-disable @typescript-eslint/no-explicit-any */

import { ITeam } from "../Interfaces/InterfaceResponseApi"

const teams: ITeam[] = []

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