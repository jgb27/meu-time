import { HStack, Select } from "@chakra-ui/react"
import { GetCoutries, GetLeague, GetTeamPlayers, GetTeamStatistic, GetTeams } from "../Controllers/Api";
import { useEffect, useState } from "react";

interface Coutry {
  name: string,
  code: string
  flag: string
}

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

interface TeamNumber {
  team: number,
  season: number,
  league: number,
  name: string
}

interface Statistic {
  games: string,
  wins: string,
  draws: string,
  loses: string,
  lineups: string,
}

interface Player {
  name: string,
  age: number,
  nationality: string,
}

interface Players {
  players: Player[]
}

interface Props {
  apiKey: string
  setTeam: (team: TeamNumber) => void
  setStatistic: (statistic: Statistic) => void
  setPlayers: (players: Players) => void
}

export const SelectGroup = ({ apiKey, setTeam, setStatistic, setPlayers }: Props) => {
  const [coutries, setCoutries] = useState<Coutry[]>([])

  const [coutry, setCoutry] = useState<string>("")

  const [leagues, setLeagues] = useState<League[]>([])
  const [league, setLeague] = useState<League>({ id: 0, name: "", logo: "" })

  const [season, setSeason] = useState<number>(0)

  const [teams, setTeams] = useState<Team[]>([])

  useEffect(() => {
    GetCoutries(apiKey).then((data) => {
      setCoutries(data)
    })
  }, [apiKey])

  return (
    <HStack minW="80%">

      {/* Coutry */}
      <Select
        placeholder="Select a country"
        onChange={(e) => {
          setCoutry(e.target.value)
          GetLeague(apiKey, e.target.value).then((data) => {
            setLeagues(data)
          })
          return
        }}
      >
        {coutries.map((coutry, index) => {
          return <option key={index} value={coutry.code}>{coutry.name}</option>
        })}
      </Select>
      {/* League */}
      <Select
        placeholder="Select a league"
        disabled={coutry ? false : true}
        onChange={(e) => {
          setLeague(leagues[parseInt(e.target.value)])
        }}
      >
        {leagues.map((league, index) => {
          return <option key={index} value={index}>{league.name}</option>
        })}
      </Select>

      {/* Season */}
      <Select
        placeholder="Select a season"
        disabled={league && coutry ? false : true}
        onChange={(e) => {
          setSeason(parseInt(e.target.value))
          GetTeams(apiKey, league.id, parseInt(e.target.value)).then((data) => {
            setTeams([])
            data.map((team: Team) => {
              const t = {
                id: team.id,
                code: team.code,
                name: team.name,
                logo: team.logo
              }
              setTeams((teams) => [...teams, t])
            })
          })
        }}
      >
        {league.sessons?.map((season, index) => {
          return <option key={index} value={season}>{season}</option>
        })}
      </Select>

      {/* Team */}
      <Select
        placeholder="Select a team"
        disabled={season && league && coutry ? false : true}
        onChange={(e) => {
          const team = {
            team: parseInt(e.target.value),
            season: season,
            league: league.id,
            name: teams.find((team) => team.id === parseInt(e.target.value))?.name || ""
          }
          setTeam(team)
          GetTeamStatistic(apiKey, team.team, team.season, team.league).then((data) => {
            setStatistic(data)
          })

          GetTeamPlayers(apiKey, team.team, team.season, team.league).then((data) => {
            setPlayers({ players: [] })
            let pl: Player[] = []
            data.map((player: Player) => {
              const p = {
                name: player.name,
                age: player.age,
                nationality: player.nationality
              }

              pl = [...pl, p]
            })
            setPlayers({ players: pl })
          })
        }}
      >
        {teams.map((team, index) => {
          return <option key={index} value={team.id}>{team.name}</option>
        })}
      </Select>
    </HStack >
  )
}