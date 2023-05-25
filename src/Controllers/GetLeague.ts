/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILeague } from "../Interfaces/InterfaceResponseApi"

const leagues: ILeague[] = []

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