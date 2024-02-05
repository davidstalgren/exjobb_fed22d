import { Typography } from "@mui/material";
import { StyledWrapper } from "./styled/StyledWrapper";
import { useDispatch, useSelector } from "react-redux";
import { UserPresentation } from "./UserPresentation";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { setFriends } from "../store/reducers/reducers";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

export function FriendsListWrapper({userId}) {
  const activeUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    async function getFriendsList() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/friends`, {
        method: 'GET',
        headers: { Authorization: `Token ${token}` },
      });
      const friendsList = await response.json();
      dispatch(setFriends({friends: friendsList}));
    }
    getFriendsList();
  },[])

  return (
    <StyledWrapper>
      <Typography variant="h5" margin='0 0 1rem 0'>Friends</Typography>
      <Box display='flex' flexDirection='column' gap='0.75rem'>
        {activeUser.friends.map((friend, index) => (
          <UserPresentation key={index} userId={friend._id} firstName={friend.firstName} lastName={friend.lastName} location={friend.location} userPictureUrl={friend.pictureUrl}></UserPresentation>
        ))}
      </Box>
      {activeUser.friends.length === 0 ? (
        <>
          <PersonAddOutlinedIcon color="primary"></PersonAddOutlinedIcon>
          <Typography fontSize='small'>
            Go ahead and get some GreenPatch Friends! 
            All you need is to click on the little Green plus icon in their posts to make new friends!
          </Typography>
        </>
      ) : (
        <></>
      )}
    </StyledWrapper>
  )
}