import { Header } from "../components/Header"
import { useLocation } from "react-router-dom";
import { SelectGroup } from "../components/SelectGroup";
import { HStack, Text, Center, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { TablePlayer, TableTeamStatistic } from "../components/TableInfo";

function Dashboard() {
  const { state } = useLocation();
  const { name, plan, apiKey } = state

  interface TeamNumber {
    team: number,
    season: number,
    league: number
  }

  interface IPlayer {
    name: string,
    age: number,
    nationality: string,
  }

  interface IPlayers {
    players: IPlayer[]
  }

  interface IStatistic {
    games: string,
    wins: string,
    draws: string,
    loses: string,
    lineups: string,
  }

  const [team, setTeam] = useState<TeamNumber>({ team: 0, season: 0, league: 0 })
  const [statistic, setStatistic] = useState<IStatistic>({ games: "", wins: "", draws: "", loses: "", lineups: "" })

  const [players, setPlayers] = useState<IPlayers>({ players: [] })

  return (
    <VStack spacing="2%">
      <Header btn={true} name={name} plan={plan} />
      <SelectGroup
        apiKey={apiKey}
        setTeam={setTeam}
        setStatistic={setStatistic}
        setPlayers={setPlayers}
      />

      <Text fontSize="2xl" fontFamily="'Inter Variable', sans-serif" fontWeight="medium">
        Most used tactic: <Text as="span" color="green.500">{statistic.lineups}</Text>
      </Text>

      <HStack
        alignItems="flex-start"
        justifyContent="space-between"
        height="600px"
        width="80%"
        p={2}
        spacing={4}
      >
        <TablePlayer players={players.players} />
        <TableTeamStatistic
          games={statistic.games}
          wins={statistic.wins}
          draws={statistic.draws}
          loses={statistic.loses}
        />
      </HStack>

    </VStack>
  )
}

export default Dashboard
