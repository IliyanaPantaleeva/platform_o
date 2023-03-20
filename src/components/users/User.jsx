import { Button, Code, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../lib/routes";
import Avatar from "../profile/Avatar";

export default function User({ user }) {
  const { id, username } = user;

  return (
    <VStack
      bg="gray.100"
      shadow="sm"
      rounded="md"
      textAlign="center"
      p="4"
      spacing="3"
    >
      <Avatar user={user} />
      <Code>@{username}</Code>
       <Button
        colorScheme="orange"
        w="60%"
        as={Link}
        to={`${PROTECTED}/profile/${user.id}`}
      >
        View Profile
      </Button>
    </VStack>
  );
}
