import { Box } from "@chakra-ui/react";
import { useComments } from "../../hook/comments";
import Comment from "./Comment";

export default function CommentList({ view }) {
  const { id } = view;

  const { comments, isLoading } = useComments(id);

  if (isLoading) return "Loading...";

  return (
    <Box>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Box>
  );
}
