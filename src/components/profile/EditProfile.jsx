import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useAuth } from "../../hook/auth";
import { useUpdateAvatar } from "../../hook/users";
import Avatar from "./Avatar";

export default function EditProfile({ isOpen, onClose }) {
  const { user, isLoading: authLoading } = useAuth();
  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL
  } = useUpdateAvatar(user?.id);

  if (authLoading) return "Loading...";

  function handleChange(e) {
    setFile(e.target.files[0]);
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton avatar />
        <ModalBody>
          <HStack spacing="5">
            <Avatar user={user} overrideAvatar={fileURL} />
            <FormControl py="4">
              <FormLabel htmlFor="picture">Change Avatar</FormLabel>
              <input type="file" accept="image/*" onChange={handleChange} />
            </FormControl>
          </HStack>
          <Button
            loadingText="Uploading"
            w="full"
            my="6"
            colorScheme="orange"
            onClick={updateAvatar}
            isLoading={fileLoading}
          >
            Save
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
