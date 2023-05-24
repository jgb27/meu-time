import { VStack } from "@chakra-ui/react"
import { Header } from "../components/Header"
import { useLocation } from "react-router-dom";

function Dashboard() {
  const { state } = useLocation();

  const name = state.name
  const plan = state.plan

  console.log(state)
  return (
    <VStack spacing="15%">
      <Header btn={true} name={name} plan={plan} />
      <h1>Dashboard</h1>
    </VStack>
  )
}

export default Dashboard
