import { SimpleGrid } from "@chakra-ui/react";
import { useUsers } from "../../hook/users";
import User from "./User";

export default function Users() {
  const { users, isLoading } = useUsers();

  if (isLoading) return "Loading...";

  return (
    <SimpleGrid spacing={10} minChildWidth="250px" p="30px">
      {users?.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </SimpleGrid>
  );
}
