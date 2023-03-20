import {
  Flex,
  HStack,
  Stack,
  Text,
  Divider,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useUser } from "../../hook/users";
import { useLikes, useViews } from "../../hook/views";
import ViewList from "../view/ViewList";
import { format } from "date-fns";
import EditProfile from "./EditProfile";
import { useAuth } from "../../hook/auth";

export default function Profile() {
  const { id } = useParams();
  const { views, isLoading: viewLoading } = useViews(id);
  const { likes, isLoading: likeLoading } = useLikes(id);
  const { user, isLoading: userLoading } = useUser(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user: authUser, isLoading: authLoading } = useAuth();
  if (userLoading) return "Loading ...";

  return (
    <Stack spacing="3">
      <Flex p={["2", "4"]} pos="relative" align="center">
        {!authLoading && authUser.id === user.id && (
          <>
            <Button
              pos="absolute"
              mb="2"
              top="6"
              right="6"
              colorScheme="orange"
              onClick={onOpen}
            >
              Change Avatar
            </Button>
          </>
        )}
        <Stack ml="10%" pt="3%">
          <Text fontSize={{base: 'xl', md: 'xl', lg: '2xl'}} fontWeight='bold' color="orange.600">
            {user.username}
          </Text>
          <HStack spacing="10">
            <Text color="gray.700" fontSize={{base: 'md', md: 'xl', lg: '2xl'}} fontWeight='bold'>
              Views: {views.length}
            </Text>
              <Text color="gray.700" fontSize={["sm", "lg"]}>
              Joined: {format(user.date, "MMMM YYY")}
            </Text>
          </HStack>
        </Stack>
        <EditProfile isOpen={isOpen} onClose={onClose} />
      </Flex>
      {/* <Divider /> */}
      {viewLoading ? (
        <Text> Views are loading...</Text>
      ) : (
        <ViewList views={views} />
      )}
    </Stack>
  );
}
