import { HStack, Select, VStack } from "@chakra-ui/react"
import { Header } from "../components/Header"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetCoutries, GetLeague, GetTeams } from "../Controllers/Api";

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

function Dashboard() {
  const { state } = useLocation();
  const { name, plan, apiKey } = state

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

  }, [])


  return (
    <VStack spacing="2%">
      <Header btn={true} name={name} plan={plan} />
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
              data.map((team: any) => {
                const t = {
                  id: team.team.id,
                  code: team.team.code,
                  name: team.team.name,
                  logo: team.team.logo
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
        <Select placeholder="Select a team" disabled={season && league && coutry ? false : true}>
          {teams.map((team, index) => {
            return <option key={index} value={team.name}>{team.name}</option>
          })}
        </Select>

      </HStack>
    </VStack>
  )
}

export default Dashboard
