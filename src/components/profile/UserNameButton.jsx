import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../lib/routes";

export default function UserNameButton({user}) {
  return (
    <Button
      as={Link}
      to={`${PROTECTED}/profile/${user.id}`}
      colorScheme="orange"
      variant="link"
    >
      {user.username}
    </Button>
  );
}
