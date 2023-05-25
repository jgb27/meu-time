import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  VStack,
  Text,
} from '@chakra-ui/react'

interface IPlayer {
  name: string,
  age: number,
  nationality: string,
}

interface IPlayers {
  players: IPlayer[],
  nameTeam: string
}

interface IStatistic {
  games: string,
  wins: string,
  draws: string,
  loses: string,
}

export const TablePlayer = ({ players, nameTeam }: IPlayers) => (
  <VStack
    width="80%"
    height="600px"
    alignItems="center"
  >
    <Text fontSize="2xl" fontFamily="'Inter Variable', sans-serif" fontWeight="medium">
      Team players: <Text as="span" color="green.500">{nameTeam}</Text>
    </Text>
    <TableContainer height="full" width="full" overflowY="auto" overflowX="hidden">
      <Table variant='striped' colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th >Year</Th>
            <Th isNumeric>Nationality</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            players.map((player, index) => (
              <Tr key={index}>
                <Td>{player.name}</Td>
                <Td >{player.age}</Td>
                <Td isNumeric>{player.nationality}</Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>
  </VStack>
)

export const TableTeamStatistic = (props: IStatistic) => (
  <VStack
    width="80%"
    height="600px"
    alignItems="center"
  >
    <Text fontSize="2xl" fontFamily="'Inter Variable', sans-serif" fontWeight="medium">
      Team statistic 
    </Text>
    <TableContainer width="full" >
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Games</Th>
            <Th>Win</Th>
            <Th>Drawns</Th>
            <Th>Loses</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{props.games}</Td>
            <Td>{props.wins}</Td>
            <Td>{props.draws}</Td>
            <Td>{props.loses}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  </VStack>
)
