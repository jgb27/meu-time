import { Header } from "../components/Header"
import { useLocation } from "react-router-dom";
import { SelectGroup } from "../components/SelectGroup";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { TablePlayer, TableTeamStatistic } from "../components/TableInfo";

function Dashboard() {
  const { state } = useLocation();
  const { name, plan, apiKey } = state

  interface TeamNumber {
    team: number,
    season: number,
    league: number
    name: string
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
    goals: GoalsForMinute
  }

  interface GoalsForMinute {
    '0-15': {
      total: number;
      percentage: string;
    },
    '16-30': {
      total: number;
      percentage: string;
    },
    '31-45': {
      total: number;
      percentage: string;
    },
    '46-60': {
      total: number;
      percentage: string;
    },
    '61-75': {
      total: number;
      percentage: string;
    },
    '76-90': {
      total: number;
      percentage: string;
    },
    '91-105': {
      total: number;
      percentage: string;
    },
    '106-120': {
      total: number;
      percentage: string;
    }
  }

  const StaticsDefault = {
    games: "",
    wins: "",
    draws: "",
    loses: "",
    lineups: "",
    goals: {
      '0-15': {
        total: 0,
        percentage: ""
      },
      '16-30': {
        total: 0,
        percentage: ""
      },
      '31-45': {
        total: 0,
        percentage: ""
      },
      '46-60': {
        total: 0,
        percentage: ""
      },
      '61-75': {
        total: 0,
        percentage: ""
      },
      '76-90': {
        total: 0,
        percentage: ""
      },
      '91-105': {
        total: 0,
        percentage: ""
      },
      '106-120': {
        total: 0,
        percentage: ""
      }
    }
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

    </VStack>
  )
}

export default Dashboard
