import { VStack, Text, Input, Link, HStack, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const LoginApiInput = () => {

  const navigate = useNavigate();

  const [apiKey, setApiKey] = useState<string>("")
  const [isIvalidApiKey, setIsIvalidApiKey] = useState<boolean>(false)

  const validateApiKey = async () => {
    const user = localStorage.getItem("user")

    if (user && JSON.parse(user).apiKey == apiKey) {
      console.log("user already logged")
      const userJson = JSON.parse(user)
      localStorage.setItem("user", JSON.stringify(userJson))
      navigate("/dashboard", { state: { apiKey: userJson.apiKey, name: userJson.name, plan: userJson.plan } })

    } else {
      console.log("user not logged")
      const response = await fetch("https://v3.football.api-sports.io/status", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey
        }
      })
      const data = await response.json()
      if (data.errors.token) {
        return setIsIvalidApiKey(true)
      }
      const name = data.response.account.firstname
      const plan = data.response.subscription.plan

      const user = {
        name: name,
        plan: plan,
        apiKey: apiKey
      }

      localStorage.setItem("user", JSON.stringify(user))
      navigate("/dashboard", { state: { apiKey: apiKey, name: name, plan: plan } })
    }

  }

  return (
    <VStack verticalAlign="Center" align="center" spacing="15px" fontFamily="'Inter Variable', sans-serif">
      <Text
        fontWeight="semibold"
        fontSize="40px"
        color="#121212"
        width="488px"
        height="52px"
        maxWidth="100%"
        textAlign="center"
      >
        Insert your Api Key
      </Text>
      <HStack spacing="10px">
        <Input
          placeholder="Api Key"
          size="lg"
          width="375px"
          height="48px"
          maxWidth="100%"
          onChange={(e) => {
            setApiKey(e.target.value)
          }}
        />
        <Button
          size="lg"
          variant="outline"
          colorScheme={apiKey.length == 32 ? "green" : "red"}
          onClick={() => {
            if (apiKey.length == 32) {
              validateApiKey()
              setIsIvalidApiKey(false)
            } else {
              setIsIvalidApiKey(true)
            }
          }}
        >
          <Text fontFamily="'Inter Variable', sans-serif" fontSize="14px">Login</Text>
        </Button>
      </HStack>
      {isIvalidApiKey ? (
        <Text
          fontWeight="medium"
          fontSize="14px"
          color="red"
          width="385px"
          height="15px"
          maxWidth="100%"
          textAlign="center"
        >
          <span>Invalid Api Key</span>
        </Text>
      ) : (<></>)
      }
      <Text
        fontWeight="medium"
        fontSize="15px"
        color="#121212"
        width="385px"
        height="25px"
        maxWidth="100%"
        textAlign="center"
      >
        <span>Do you don't have api key? </span>
        <Link
          fontWeight="semibold"
          textDecoration="underline"
          color="#1FE3C0"
          href="https://dashboard.api-football.com/register"
          isExternal
        >
          Click here
        </Link>
      </Text>
    </VStack >
  )
}