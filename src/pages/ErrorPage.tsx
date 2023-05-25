// create pag 404
import { Container, Text, VStack } from "@chakra-ui/react"

const Error404 = () => {

  return (
    <Container maxW="full">
      <VStack width="100%" height="80vh" justifyContent="center" alignItems="center" spacing={4}>
        <VStack spacing={-2}>
          <Text fontSize="6xl" textAlign="center" fontFamily="'Inter Variable', sans-serif" fontWeight="semibold">
            Error 404
          </Text>
          <Text fontSize="2xl" textAlign="center" fontFamily="'Inter Variable', sans-serif" fontWeight="medium">
            Page not found
          </Text>
        </VStack>
        <Text fontSize="xl" textAlign="center" fontFamily="'Inter Variable', sans-serif" fontWeight="light">
          The page you are looking for might have been removed had its name changed or is temporarily unavailable.
        </Text>
      </VStack>
    </Container>
  )
}

export default Error404