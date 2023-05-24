import { HStack, Select, VStack } from "@chakra-ui/react"
import { Header } from "../components/Header"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetCoutries, GetLeague } from "../Controllers/Api";

interface Coutry {
  name: string,
  code: string
  flag: string
}

interface League {
  id: number,
  name: string,
  logo: string
}

function Dashboard() {
  const { state } = useLocation();
  const { name, plan, apiKey } = state

  const [coutries, setCoutries] = useState<Coutry[]>([])
  const [coutry, setCoutry] = useState<string>("")

  const [leagues, setLeagues] = useState<League[]>([])

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
          }}
        >
          {coutries.map((coutry, index) => {
            return <option key={index} value={coutry.code}>{coutry.name}</option>
          })}
        </Select>
        {/* League */}
        <Select placeholder="Select a league">
          {leagues.map((league, index) => {
            return <option key={index} value={league.id}>{league.name}</option>
          })}
        </Select>
      </HStack>
    </VStack>
  )
}

export default Dashboard
