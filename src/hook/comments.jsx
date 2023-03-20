import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { db } from "../firebase";
import { uuidv4 } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function useAddComment({ viewID, uid }) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function addComment(text) {
    setLoading(true);
    const id = uuidv4();
    const date = Date.now();
    const docRef = doc(db, "comments", id);
    await setDoc(docRef, { text, id, viewID, date, uid });

    toast({
      title: "Comment added!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });

    setLoading(false);
  }
  return { addComment, isLoading };
}

export function useComments(viewID) {
  const q = query(
    collection(db, "comments"),
    where("viewID", "==", viewID),
    orderBy("date", "desc")
  );

  const [comments, isLoading, error] = useCollectionData(q);

  if (error) throw error;

  return { comments, isLoading };
}

export function useDeleteComment(id) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function deleteComment() {
    const res = window.confirm("You want delete this comment?");

    if (res) {
      setLoading(true);

      const docRef = doc(db, "comments", id);
      await deleteDoc(docRef);

      toast({
        title: "Delete comment!",
        status: "info",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    }
  }

  return { deleteComment, isLoading };
}
