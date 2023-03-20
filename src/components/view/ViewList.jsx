import View from "./View";
import { Box, Text } from "@chakra-ui/react";

export default function ViewList({ views }) {
  return (
    <Box align='center'>
      {views?.length === 0
        ? <Text fontSize='xl' textAlign='center'> Don't have views yet. </Text>
        : views?.map((view) => <View key={view.id} view={view} />)}
    </Box>
  );
}
