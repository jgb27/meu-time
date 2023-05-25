import { VStack } from "@chakra-ui/react"
import { Header } from "../components/Header"
import { LoginApiInput } from "../components/LoginApiInput"

function Login() {
  return (
    <VStack spacing="15%">
      <Header />
      <LoginApiInput />
    </VStack>
  )
}

export default Login
