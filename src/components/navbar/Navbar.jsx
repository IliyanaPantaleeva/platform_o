import {
  Box,
  Button,
  Heading,
  HStack,
  Textarea,
  Container,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { useAuth } from "../../hook/auth";
import { useAddView, useViews } from "../../hook/views";
import ViewList from "../view/ViewList";

export function NewView() {
  const { register, handleSubmit, reset } = useForm();
  const { addView, isLoading: addingView } = useAddView();
  const { user, isLoading: authLoading } = useAuth();

  async function handleAddViews(data) {
    console.log(data);
    addView({
      uid: user.id,
      text: data.text,
    });
    reset();
  }

  return (
    <Container
      mt='1'
      pos="fixed"
      rounded="2xl"
      zIndex="100"
      bgGradient="linear(to-t, orange.100, orange.200)"
      maxW="xl"
      ml={{sm:'1%', base: "1%", md: "8%",  lg: "8%", xl:'8%', '2xl':'8%' }}
       mb='2%'
    >
      <Form  onSubmit={handleSubmit(handleAddViews)}>
        
        <HStack justify="space-around" gap='20%' mt='2' >
          <Heading as="h1" fontSize={{ base: "md", md: "md",  lg: "xl" }}>
            Share Your Views
          </Heading>
          <Button
            mr="1%"
            colorScheme="orange"
            type="submit"
            isLoading={authLoading || addingView}
            loadingText="Loading"
          >
            Share Views
          </Button>
        </HStack>
        <Textarea
          h="10"
          size="xs"
          fontSize={{ base: "md", md: "md",  lg: "xl" }}
          as={TextareaAutosize}
          resize="none"
          mt="3"
          textAlign='center'
          placeholder="Share New View..."
          minRows={1}
          maxRows={2}
          {...register("text", { required: true })}
        />
      </Form>
    </Container>
  );
}

export default function Navbar() {
  const { views, isLoading } = useViews();

  if (isLoading) return "Loading views...";

  return (
    <>
      <NewView />
      <Box mt={{sm:'22%', base: "38%",  md: "22%",  lg: "22%", xl:'22%%', '2xl':'22%' }}>
      <ViewList zIndex="10" views={views} />
      </Box>
    </>
  );
}
