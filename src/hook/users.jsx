import { collection, doc, query, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export function useUser(id) {
  const q = query(doc(db, "users", id));
  const [user, isLoading] = useDocumentData(q);
  
  return { user, isLoading };
}

export function useUpdateAvatar(uid) {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const toast = useToast();
  const nav = useNavigate();

  async function updateAvatar() {
    if (!file) {
      toast({
        title: "No file selected!",
        description: "Please select a file to upload",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      return;
    }

    setLoading(true);
    const fileRef = ref(storage, "avatars/" + uid);
    await uploadBytes(fileRef, file);

    const avatarURL = await getDownloadURL(fileRef);

    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { avatar: avatarURL });

    toast({
      title: "Profile update!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    setLoading(false);
    nav(0);
  }

  return { 
    setFile, 
    updateAvatar, 
    isLoading, 
    fileURL: file && URL.createObjectURL(file)
 };
}

export function useUsers(){
  const [users, isLoading] = useCollectionData(collection(db, 'users'))

  return {users, isLoading}

}


