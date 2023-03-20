import { Flex, IconButton } from "@chakra-ui/react";
import {
  FaRegHeart,
  FaHeart,
  FaComment,
  FaRegComment,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../hook/auth";
import { useComments } from "../../hook/comments";
import { useToggleLike, useDeleteView } from "../../hook/views";
import { PROTECTED } from "../../lib/routes";

export default function Actions({ view }) {
  const { id, likes, uid } = view;
  const { user, isLoading: userLoading } = useAuth();

  const isLiked = likes.includes(user?.id);
  const config = {
    id,
    isLiked,
    uid: user?.id,
  };
  const { toggleLike, isLoading: likeLoading } = useToggleLike(config);
  //   console.log(likes);
  const { deleteView, isLoading: deleteLoading } = useDeleteView(id);
  const { comments, isLoading: commentLoading } = useComments(id);

  return (
    <Flex p="2">
      <Flex alignItems="center">
        <IconButton
          onClick={toggleLike}
          isLoading={likeLoading || userLoading}
          size="md"
          colorScheme="red"
          variant="ghost"
          icon={isLiked ? <FaHeart /> : <FaRegHeart />}
          isRound
        />
        {likes.length}
      </Flex>
      <Flex alignItems="center" ml="2">
        <IconButton
          as={Link}
          to={`${PROTECTED}/comments/${id}`}
          size="md"
          colorScheme="orange"
          variant="ghost"
          icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />}
          isRound
        />
        {comments?.length}
      </Flex>

      {!userLoading && user.id === uid && (
        <IconButton
          ml="auto"
          onClick={deleteView}
          to={`${PROTECTED}/comments/${id}`}
          isLoading={deleteLoading}
          size="md"
          bgGradient={[
            "linear(to-tr, orange.300, yellow.400)",
            "linear(to-t, blue.200, orange.500)",
            "linear(to-b, orange.100, purple.300)",
          ]}
          colorScheme="red"
          variant="ghost"
          icon={<FaTrashAlt />}
          isRound
        />
      )}
    </Flex>
  );
}
