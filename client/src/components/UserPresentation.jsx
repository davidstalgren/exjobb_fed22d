import { IconButton, Typography } from "@mui/material";
import { BoxSpaced } from "./styled/StyledBox";
import { Box, useTheme } from "@mui/system";
import { ProfileImage } from "./ProfileImage";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../store/reducers/reducers";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

export function UserPresentation({ userId, firstName, lastName, location, userPictureUrl }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const activeUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const isOwnPost = userId === activeUser._id;

  const friendStatus = Boolean(activeUser.friends.find((friend) => friend._id === userId));
  
  async function toggleFriend() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${activeUser._id}/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      },
    });

    const newFriendListStatus = await response.json();
    dispatch(setFriends({friends: newFriendListStatus}));
  }

  return (
    <BoxSpaced marginBottom='1rem'>
      <BoxSpaced gap='1rem' onClick={() => {navigate(`/profile/${userId}`)}} sx={{ '&:hover': { cursor: 'pointer' } }}>
        <ProfileImage pictureUrl={userPictureUrl} size="3rem"></ProfileImage>
        <Box>
          <Typography color={theme.palette.primary.dark}>{firstName} {lastName}</Typography>
          <Typography fontSize='small' color={theme.palette.primary.dark}>{location}</Typography>
        </Box>
      </BoxSpaced>
      <BoxSpaced gap='1rem'>
        {!isOwnPost ? (
          <Tooltip title={friendStatus ? `Remove ${firstName} as friend` : `Add ${firstName} as friend`} TransitionComponent={Zoom} enterDelay={750} arrow>
            <IconButton 
              onClick={toggleFriend} 
              sx={{
                outline: `1px solid ${theme.palette.primary.light}`, 
                '&:hover': {
                  cursor: 'pointer', 
                  outline: `2px solid ${theme.palette.primary.dark}`
                }
              }}>
              {friendStatus ? (
                <PersonRemoveOutlinedIcon color="primary"></PersonRemoveOutlinedIcon>
              ) : (
                <PersonAddOutlinedIcon color="primary"></PersonAddOutlinedIcon>
              )}
            </IconButton>
          </Tooltip>
        ) : (
          <></>
        )}
      </BoxSpaced>
    </BoxSpaced>
  )
}