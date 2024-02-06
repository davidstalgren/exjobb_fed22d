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
    <Box sx={isDesktop ? ({...{
      backgroundImage: "url('gpn_logo10opacity.png')", 
      backgroundPosition: 'bottom -23rem right -20rem',
      backgroundRepeat: `no-repeat`,
      backgroundSize: '65rem',
      backgroundClip: 'content-box',
      backgroundAttachment: 'fixed',
      width: "100%",
    }}) : ({...{
      backgroundImage: "url('gpn_logo10opacity.png')",
      backgroundPosition: 'bottom -15rem right -15rem',
      backgroundRepeat: `no-repeat`,
      backgroundSize: '40rem',
      backgroundClip: 'content-box',
      backgroundAttachment: 'fixed',
      width: "100%",
    }})}>
      <Navbar></Navbar>
      <Box width='100%' padding='2rem' display={isDesktop ? 'flex' : 'block'} gap='0.75rem' justifyContent='space-between'>
        <Box flexBasis={isDesktop ? '25%' : undefined}>
          <UserWrapper></UserWrapper>
        </Box>
        <Box flexBasis={isDesktop ? '45%' : undefined} margin={isDesktop ? undefined : '1rem 0 0 0'}>
          <CreatePostWrapper></CreatePostWrapper>
          <PostsWrapper></PostsWrapper>
        </Box>
        {isDesktop && 
          <Box flexBasis='25%'>
            <FriendsListWrapper userId={user._id}></FriendsListWrapper>
          </Box>}
      </Box>
    </Box>
  )
}