import { Flex, Text, Box } from "@chakra-ui/react";
import { useUser } from "../../hook/users";
import Avatar from "../profile/Avatar";
import { formatDistanceToNow } from "date-fns";
import UserNameButton from "../profile/UserNameButton";

export default function Header({ view }) {
  const {uid, date} = view;
  const { user, isLoading } = useUser(uid);

  if (isLoading) return "Loading...";

  return (
    <Flex
      alignItems="center"
      borderBottom="2px solid"
      borderColor="gray.100"
      p="3"
      bg="gray.50"
    >
      <Avatar user={user} size="md" />

      <Box ml='4'>
        <UserNameButton user={user} />
        
        <Text
        fontSize='sm'
        color='gray.500'
        >
            {formatDistanceToNow(date)} ago 
        </Text>
      </Box>
    </Flex>
  );
}
