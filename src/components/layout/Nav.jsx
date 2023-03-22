import { Button, Flex, Link, Box, Image } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useLogout } from "../../hook/auth";
import { NAVBAR, USERS } from "../../lib/routes";
import soft from '../../assets/sl.jpg'

export default function Nav() {
  const { logout, isLoading } = useLogout();
  const nav = useNavigate()
  return (
    <Flex
      shadow="sm"
      pos="fixed"
      width="full"
      borderTop="6px solid"
      borderTopColor="orange.400"
      height="16"
      zIndex="3"
      justify="center"
      bg="orange"
    >
      <Flex
      mr='auto' 
      boxSize="100%" 
      as={RouterLink}
      to={NAVBAR}
      py={{sm:'40%', base: "2%", md: "0%",  lg: "0%" }}>
        <Image rounded='md'  src={soft} alt="Soft World" />
      </Flex>

      <Flex px="3" w="full" align="center" maxW="1200px" bg="whiteAlpha.300">
        <Flex justify='space-between' gap='10' mr='5%'>
        <Link color="white" as={RouterLink} to={NAVBAR} fontWeight="bold">
          Home
        </Link>
        <Link color="white" as={RouterLink} to={USERS} fontWeight="bold">
        Users
        </Link>
        </Flex>
        <Button
          ml="auto"
          colorScheme="gray"
          size="sm"
          onClick={logout}
          isLoading={isLoading}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}
