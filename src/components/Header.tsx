import { Text, Stack, Button, VStack, HStack } from "@chakra-ui/react"

interface HeaderProps {
  btn?: boolean | false
  name?: string 
  plan?: string
}

export const Header = (props: HeaderProps) => {
  const align = !props.btn ? "flex-start" : "center";
  return (
    <Stack
      paddingStart="53px"
      paddingEnd="27px"
      paddingTop="14px"
      paddingBottom="17px"
      direction="row"
      justify={align}
      align={align}
      spacing="80%"
      minWidth="100%"
    >
      <VStack spacing={2} fontFamily="'Inter Variable', sans-serif">
        <Text
          fontWeight="semibold"
          fontSize="40px"
          color="#000000"
          textAlign="center"
        >
          Meu time
        </Text>
        {
          props.name ? (<HStack>
            <Text fontSize="14px" color="#000000">
              Welcome {props.name}!
            </Text>
            <Text fontSize="14px" color="green">
              Plan: {props.plan}
            </Text>
          </HStack>) : (<></>)
        }
      </VStack>
      {
        props.btn ? (<Button size="lg" variant="outline" colorScheme="red">
          <Text fontFamily="'Inter Variable', sans-serif" fontSize="14px">Exit</Text>
        </Button>) : (<></>)
      }
    </Stack>
  )
}