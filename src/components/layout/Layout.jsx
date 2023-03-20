import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LOGIN } from "../../lib/routes";
import { useAuth } from "../../hook/auth";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { Flex, Box } from "@chakra-ui/react";

export default function Layout() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  // console.log(pathname);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && pathname.startsWith("/protected") && !user) {
      // console.log('Protected route');
      nav(LOGIN);
    }
  }, [pathname, user, isLoading]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <Nav />
      <Flex pt='16' pb='12' mx='auto' w='full' maxWidth='1200px'>
      <Sidebar />
        <Box w="900px">
          <Outlet />
        </Box>
       
      </Flex>
    </>
  );
}
