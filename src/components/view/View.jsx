import { Box, Text } from "@chakra-ui/react";
import Actions from "./Actions";
import Header from "./Header";

export default function View({ view }) {
  const {text} = view;
  return (
    <Box p="2" maxW="600px" textAlign='left'>
      <Box border="2px solid" borderColor="gray.100" borderRadius="md">
        <Header view={view} />

        <Box p="2" minH="100px">
          <Text wordBreak="break-word" fontSize={["sm", "md"]}>
            {text}
          </Text>
        </Box>

        <Actions view={view}/>
      </Box>
    </Box>
  );
}
