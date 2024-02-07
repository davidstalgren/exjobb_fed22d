import { CreatePostWrapper } from "./CreatePostWrapper";
import { FriendsListWrapper } from "./FriendsListWrapper";
import { PostsWrapper } from "./PostsWrapper";
import { UserWrapper } from "./UserWrapper";
import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";

export function ProfileView() {
  const [userProfileData, setUserProfileData] = useState(null);
  const {userId} = useParams();
  const token = useSelector((state) => state.token);
  const isDesktop = useMediaQuery('(min-width: 900px)');
  const activeUser = useSelector((state) => state.user);

  useEffect(() => {
    async function getUserData() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Token ${token}` },
      });
      const userData = await response.json();
      setUserProfileData(userData);
    }
    getUserData();
  }, [])

  return (
    <Box sx={isDesktop ? ({...{
      backgroundImage: `url('${process.env.REACT_APP_STATICASSETS_URL}/gpn_logo10opacity.png')`, 
      backgroundPosition: 'bottom -23rem right -20rem',
      backgroundRepeat: `no-repeat`,
      backgroundSize: '65rem',
      backgroundClip: 'content-box',
      backgroundAttachment: 'fixed',
      width: "100%",
    }}) : ({...{
      backgroundImage: `url('${process.env.REACT_APP_STATICASSETS_URL}/gpn_logo10opacity.png')`,
      backgroundPosition: 'bottom -15rem right -15rem',
      backgroundRepeat: `no-repeat`,
      backgroundSize: '40rem',
      backgroundClip: 'content-box',
      backgroundAttachment: 'fixed',
      width: "100%",
    }})}>
      <Navbar></Navbar>
      <Box width='100%' padding='2rem' display={isDesktop ? 'flex' : 'block'} gap='1.5rem' justifyContent='center'>
        <Box flexBasis={isDesktop ? '25%' : undefined}>
          {userProfileData && <UserWrapper user={userProfileData}></UserWrapper>}
          {userProfileData && <FriendsListWrapper user={userProfileData} profileView></FriendsListWrapper>}
        </Box>
        <Box flexBasis={isDesktop ? '60%' : undefined} margin={isDesktop ? undefined : '1rem 0 0 0'}>
          {userProfileData && (activeUser._id === userProfileData._id) && <CreatePostWrapper></CreatePostWrapper>}
          {userProfileData && <PostsWrapper profileId={userProfileData._id} profileView></PostsWrapper>}
        </Box>
      </Box>
    </Box>
  )
}