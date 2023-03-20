import { Link } from "react-router-dom";
import { PROTECTED } from "../../lib/routes";
import {Avatar as ChakraAvatar} from '@chakra-ui/react'

export default function Avatar({user, size='2xl', overrideAvatar = null}) {
    
    if(!user) return 'Loading...'

  return (
    <ChakraAvatar
    as={Link}
    to={`${PROTECTED}/profile/${user.id}`}
      name={user.username}
      size={size}
      src={overrideAvatar || user.avatar}
      _hover={{ cursor: "pointer", opacity: "0.8" }}
    />
  );
}
