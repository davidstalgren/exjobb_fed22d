import { CreatePostWrapper } from "./CreatePostWrapper";
import { FriendsListWrapper } from "./FriendsListWrapper";
import { PostsWrapper } from "./PostsWrapper";
import { UserWrapper } from "./UserWrapper";
import { Navbar } from "./Navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

export function HomeView() {
  const isDesktop = useMediaQuery('(min-width: 900px)');
  const user = useSelector((state) => state.user);
  
  return (
    <Box>
      <Navbar></Navbar>
      <Box width='100%' padding='2rem' display={isDesktop ? 'flex' : 'block'} gap='0.75rem' justifyContent='space-between'>
        <Box flexBasis={isDesktop ? '25%' : undefined}>
          <UserWrapper></UserWrapper>
        </Box>
        <Box flexBasis={isDesktop ? '45%' : undefined}>
          <CreatePostWrapper></CreatePostWrapper>
          <PostsWrapper></PostsWrapper>
        </Box>
        {isDesktop && 
          <Box flexBasis='25%'>
            <FriendsListWrapper></FriendsListWrapper>
          </Box>}
      </Box>
    </Box>
  )
}