import { VStack } from "@chakra-ui/react"
import { Header } from "./components/Header"
import { LoginApiInput } from "./components/LoginApiInput"

function App() {

  return (
    <VStack spacing="15%">
      <Header btn={false} />
      <LoginApiInput />
    </VStack>
  )
}

export default App
