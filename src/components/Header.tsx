import { Text, Stack, Button } from "@chakra-ui/react"

interface HeaderProps {
  btn: boolean
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
      <Text
        fontFamily="'Inter Variable', sans-serif"
        fontWeight="semibold"
        fontSize="40px"
        color="#000000"
        textAlign="center"
      >
        Meu time
      </Text>
      {
        props.btn ? (<Button size="lg" variant="outline" colorScheme="red">
          <Text fontFamily="'Inter Variable', sans-serif" fontSize="14px">Exit</Text>
        </Button>) : (<></>)
      }
    </Stack>
  )
}