import { Header } from "../components/Header"
import { useLocation } from "react-router-dom";
import { SelectGroup } from "../components/SelectGroup";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { TablePlayer, TableTeamStatistic } from "../components/TableInfo";
import { TeamNumber } from "../Interfaces/InterfaceTeam";
import { IStatistic, StaticsDefault } from "../Interfaces/IntefaceStatistic";
import { IPlayer } from "../Interfaces/InterfaceResponseApi";

function Dashboard() {
  const { state } = useLocation();
  const { name, plan, apiKey } = state

  interface IPlayers {
    players: IPlayer[]
  }

  const [team, setTeam] = useState<TeamNumber>({ team: 0, season: 0, league: 0, name: "" })
  const [statistic, setStatistic] = useState<IStatistic>(StaticsDefault)

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

      {
        team.team !== 0 && team.season !== 0 && team.league !== 0 ?
          (
            <>
              <Text fontSize="2xl" fontFamily="'Inter Variable', sans-serif" fontWeight="medium">
                Most used tactic: <Text as="span" color="green.500">{statistic.lineups}</Text>
              </Text>

              <HStack
                alignItems="flex-start"
                justifyContent="space-between"
                height="600px"
                width="80%"
                p={2}
              >
                <TablePlayer players={players.players} nameTeam={team.name} />
                <TableTeamStatistic
                  games={statistic.games}
                  wins={statistic.wins}
                  draws={statistic.draws}
                  loses={statistic.loses}
                  goals={statistic.goals}
                />
              </HStack>
            </>
          ) : (<></>)
      }

    </VStack>
  )
}

export default Dashboard
