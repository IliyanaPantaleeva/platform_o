import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  deleteDoc,
  getDoc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useState } from "react";
import { db } from "../firebase";

export function useAddView() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function addView(view) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "views", id), {
      ...view,
      id,
      date: Date.now(),
      likes: [],
    });
    toast({
      title: "View added successfully",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    setLoading(false);
  }

  return { addView, isLoading };
}

export function useToggleLike({ id, isLiked, uid }) {
  const [isLoading, setLoading] = useState(false);

  async function toggleLike() {
    setLoading(true);
    const docRef = doc(db, "views", id);
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
      
    });
  setLoading(false);
  }

  return { toggleLike, isLoading };
}

export function useDeleteView(id){
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()

  async function deleteView(){
    const res = window.confirm('Are you sure you want to delete this view?')

    if(res){
      setLoading(true)

      await deleteDoc(doc(db, 'views', id))

      const q = query(collection(db, 'comments'), where('viewId', '==', id))
      const querySnapshot= await getDoc(q)
      querySnapshot.forEach(async(doc) => deleteDoc(doc.ref))

      toast({
        title: 'delete View!',
        status: 'info',
        isClosable: true,
        position: 'top',
        duration: 5000
      })

      setLoading(false)
    }
  }

  return{deleteView, isLoading}
}

export function useView(id) {
  const q = doc(db, "views", id);
  const [view, isLoading] = useDocumentData(q);

  return { view, isLoading };
}

export function useViews(uid = null) {
  const q = uid
    ? query(
        collection(db, "views"),
        orderBy("date", "desc"),
        where("uid", "==", uid)
      )
    : query(collection(db, "views"), orderBy("date", "desc"));
  const [views, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { views, isLoading };
}


export function useAddLikes() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function addLike(view) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "likes", id), {
      ...like,
      id,
      date: Date.now(),
      views: [],
    });
    toast({
      title: "LIke added successfully",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    setLoading(false);
  }

  return { addLike, isLoading };
}

export function useLikes(uid = null) {
  const q = uid
    ? query(
        collection(db, "views"),
        orderBy("date", "desc"),
        where("uid", "==", uid)
      )
    : query(collection(db, "views"), orderBy("date", "desc"));
  const [likes, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { likes, isLoading };
}


