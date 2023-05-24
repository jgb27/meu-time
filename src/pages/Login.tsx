import { VStack } from "@chakra-ui/react"
import { Header } from "../components/Header"
import { LoginApiInput } from "../components/LoginApiInput"
import { useState } from "react"

function Login() {
  const [name, setName] = useState<string>("")
  const [plan, setPlan] = useState<string>("")

  return (
    <VStack spacing="15%">
      <Header btn={false} name={name} plan={plan} />
      <LoginApiInput setName={setName} setPlan={setPlan} />
    </VStack>
  )
}

export default Login
