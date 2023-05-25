import { Header } from "../components/Header"
import { useLocation } from "react-router-dom";
import { SelectGroup } from "../components/SelectGroup";
import { HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
} from '@chakra-ui/react'

function Dashboard() {
  const { state } = useLocation();
  const { name, plan, apiKey } = state

  interface TeamNumber {
    team: number,
    season: number,
    league: number
  }

  interface Player {
    name: string,
    age: number,
    nationality: string,
  }

  interface Players {
    players: Player[]
  }

  interface Statistic {
    games: string,
    wins: string,
    draws: string,
    loses: string,
    lineups: string,
  }

  const [team, setTeam] = useState<TeamNumber>({ team: 0, season: 0, league: 0 })
  const [statistic, setStatistic] = useState<Statistic>({ games: "", wins: "", draws: "", loses: "", lineups: "" })
  
  const [players, setPlayers] = useState<Players>({ players: [] })

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
        Most used tactic: {statistic.lineups}
      </Text>

      <HStack justifyContent="space-between" minW="70%" justifyItems="flex-start" alignItems="flex-start">
        <VStack alignItems="flex-start">
          <Text
            fontSize="2xl"
            fontFamily="'Inter Variable', sans-serif"
            fontWeight="medium"
          >
            Player List
          </Text>
          <TableContainer maxH="2%" >
            <Table variant='striped' colorScheme='dark'>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Age</Th>
                  <Th>Nationality</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  players.players.map((player, index) => (
                    <Tr key={index}>
                      <Td>{player.name}</Td>
                      <Td>{player.age}</Td>
                      <Td>{player.nationality}</Td>
                    </Tr>
                  ))
                }
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
        <VStack alignItems="flex-start" >
          <Text
            fontSize="2xl"
            fontFamily="'Inter Variable', sans-serif"
            fontWeight="medium"
          >
            Team Statistic
          </Text>
          <TableContainer>
            <Table variant='striped' colorScheme='dark'>
              <Thead>
                <Tr>
                  <Th>Games</Th>
                  <Th>Wins</Th>
                  <Th>Draws</Th>
                  <Th>Loses</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{statistic.games}</Td>
                  <Td>{statistic.wins}</Td>
                  <Td>{statistic.draws}</Td>
                  <Td>{statistic.loses}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </HStack>

    </VStack>
  )
}

export default Dashboard
