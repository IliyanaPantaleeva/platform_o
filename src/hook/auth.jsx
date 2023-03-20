import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useToast } from "@chakra-ui/react";
import { auth, db } from "../firebase";
import { LOGIN, NAVBAR } from "../lib/routes";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import isUsernameExists from "../utils/isUsernameExists";
import { useEffect } from "react";

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [user, setUser] = useState(null)
  const [isLoading, setLoading] = useState(true)
  useEffect(() =>{
async function fetchData(){
  setLoading(true)
  const ref = doc(db, 'users', authUser.uid)
  const docSnap = await getDoc(ref)
  setUser((docSnap).data())
  setLoading(false)
}
if(!authLoading){
  if(authUser) fetchData()
  else setLoading(false)
}
  },[authLoading])
  return { user, isLoading, error };
}

export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const nav = useNavigate();

  async function login({ email, password, redirectTo = NAVBAR }) {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Successes Log In",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      nav(NAVBAR);
    } catch (err) {
      toast({
        title: "Not Log In",
        description: err.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
      return false;
    }

    setLoading(false);
    return true;
  }

  return { login, isLoading };
}
export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const nav = useNavigate();

  async function register({ username, email, password, redirectTo = NAVBAR}) {
    setLoading(true);
    const usernameExist = await isUsernameExists(username);
    if (usernameExist) {
      toast({
        title: "Username exist",
        description: err.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
        });

        toast({
          title: "Account created",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        nav(NAVBAR);
      } catch (err) {
        toast({
          title: "Not Sign In",
          description: err.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
      } 
       finally {
        setLoading(false);
      }
    }
  }
  return { register, isLoading };
}

export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  const nav = useNavigate();
  const toast = useToast();

  async function logout() {
    if (await signOut()) {
      toast({
        title: "Successfully Log Out",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      nav(LOGIN);
    }
  }
  return { logout, isLoading };
}
