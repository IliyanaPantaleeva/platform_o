import { Box, Button, Stack, Code, Image} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hook/auth";
import { PROTECTED, USERS } from "../../lib/routes";
import Avatar from '../profile/Avatar' 

function ActiveUser() {
  const { user, isLoading } = useAuth();

  if(isLoading) return 'Loading...'

  return (
    <Stack align="center" spacing="5" my="8">
      <Avatar user={user}/>  
      {/* <Image boxSize='200px' borderRadius='xl' src='https://bit.ly/dan-abramov' alt='Dan Abramov' /> */}
      <Code>@{user.username}</Code>
      <Button
        colorScheme="orange"
        w="full"
        as={Link}
        to={`${PROTECTED}/profile/${user.id}`}
      >
        Edit Profile
      </Button>
    </Stack>
  );
}

export default function Sidebar() {
  return (
    <Box
      px="6"
      height="100vh"
      w="100%"
      maxW="300px"
      borderLeft="1px solid"
      borderLeftColor="orange.100"
      position="sticky"
      top="16"
      display={{ base: "none", md: "block" }}
    >
      <ActiveUser />
      <Box align="center">
        <Box as="ul" borderBottom="2px solid" borderColor="orange.200" />
        <Button
          variant="outline"
          colorScheme="orange"
          as={Link}
          to={USERS}
          mt="4"
          size="sm"
        >
          ALL USERS
        </Button>
      </Box>
    </Box>
  );
}
