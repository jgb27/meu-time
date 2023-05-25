import { HStack, Select } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Coutry, ILeague, IPlayer, ITeam } from "../Interfaces/InterfaceResponseApi";
import { IStatistic } from "../Interfaces/IntefaceStatistic";
import { TeamNumber } from "../Interfaces/InterfaceTeam";
import { GetCoutries } from "../Controllers/GetCoutries";
import { GetLeague } from "../Controllers/GetLeague";
import { GetTeams } from "../Controllers/GetTeams";
import { GetTeamStatistic } from "../Controllers/GetTeamStatistic";
import { GetTeamPlayers } from "../Controllers/GetTeamPlayers";

interface Players {
  players: IPlayer[]
}

interface Props {
  apiKey: string
  setTeam: (team: TeamNumber) => void
  setStatistic: (statistic: IStatistic) => void
  setPlayers: (players: Players) => void
}

export const SelectGroup = ({ apiKey, setTeam, setStatistic, setPlayers }: Props) => {
  const [coutries, setCoutries] = useState<Coutry[]>([])

  const [coutry, setCoutry] = useState<string>("")

  const [leagues, setLeagues] = useState<ILeague[]>([])
  const [league, setLeague] = useState<ILeague>({ id: 0, name: "", logo: "" })

  const [season, setSeason] = useState<number>(0)

  const [teams, setTeams] = useState<ITeam[]>([])

  useEffect(() => {
    GetCoutries(apiKey).then((data) => {
      setCoutries(data)
    })
  }, [apiKey])

  return (
    <HStack minW="80%" alignItems="center">
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
            data.map((team: ITeam) => {
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
            let pl: IPlayer[] = []
            data.map((player: IPlayer) => {
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