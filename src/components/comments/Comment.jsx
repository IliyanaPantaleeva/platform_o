import { Flex, Box, Text, IconButton } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../../hook/auth";
import { useDeleteComment } from "../../hook/comments";
import { useUser } from "../../hook/users";
import Avatar from "../profile/Avatar";
import UserNameButton from "../profile/UserNameButton";

export default function Comment({comment}) {
    const {text, uid, date, id} = comment;
    const {user, isLoading: userLoading} = useUser(uid)
    const {user: authUser, isLoading: authLoading} = useAuth()
    const{deleteComment, isLoading: deleteLoading} = useDeleteComment(id)

    if (userLoading) return 'Loading...'
  
    
  return (
    <Box px="4" py="2" maxW="600px" mx="auto" textAlign="left">
      <Flex pb="2">
        <Avatar user={user} size='sm'/>
        <Box flex="1" ml="4">
          <Flex borderBottom="1px solid" borderColor="orange.100" pb="2">
            <Box color='orange.500'>
                <UserNameButton user={user}/>
              <Text fontSize="xs" color="gray.500">
                {formatDistanceToNow(date)}
              </Text>
            </Box>
            { !authLoading && authUser.id === uid && (
            <IconButton
            size='sm'
            ml='auto'
            icon={<FaTrash/>}
            colorScheme="red"
            variant="ghost"
            bgGradient={[
                'linear(to-tr, orange.300, yellow.400)',
                'linear(to-t, blue.200, orange.500)',
                'linear(to-b, orange.100, purple.300)',
              ]}
            isRound
            onClick={deleteComment}
            isLoading={deleteLoading}
            />)
        }
          </Flex>
          <Box pt="2" fontSize="sm">
            <Text>{text}</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}


