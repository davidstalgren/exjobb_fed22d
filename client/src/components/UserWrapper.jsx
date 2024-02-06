import { StyledWrapper } from "./styled/StyledWrapper";
import { Box, useTheme } from "@mui/system";
import { useSelector } from "react-redux";
import { BoxSpaced } from "./styled/StyledBox";
import { ProfileImage } from "./ProfileImage";
import { Divider, IconButton, Tooltip, Typography, Zoom } from "@mui/material";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { useNavigate } from "react-router-dom";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

export function UserWrapper() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate();
  const theme = useTheme();
  
  return (
    <StyledWrapper>
      <BoxSpaced marginBottom='1rem'>
        <BoxSpaced gap='1rem' onClick={() => navigate(`/profile/${user._id}`)} sx={{'&:hover': {cursor: 'pointer'}}}>
          <ProfileImage pictureUrl={user.pictureUrl}></ProfileImage>
          <Box>
            <Typography variant="h4" color={theme.palette.primary.dark}>{user.firstName} {user.lastName}</Typography>
            <Typography color={theme.palette.neutral.mediumMain}>{user.friends.length} {user.friends.length === 1 ? 'Friend' : 'Friends'}</Typography>
          </Box>
        </BoxSpaced>
        <Tooltip title={`Visit ${user.firstName}'s profile`} TransitionComponent={Zoom} enterDelay={750} arrow>
          <IconButton onClick={() => navigate(`/profile/${user._id}`)}>
            <AccountBoxOutlinedIcon color="primary" fontSize='large' sx={{'&:hover': {cursor: 'pointer'}}}></AccountBoxOutlinedIcon>
          </IconButton>
        </Tooltip>
      </BoxSpaced>

      <Divider></Divider>

      <Box display='flex' flexDirection='column' padding='1rem'>
        <Box display='flex' alignItems='flex-start' gap='1rem' marginBottom='0.75rem'>
          <LocationOnOutlinedIcon color='primary'></LocationOnOutlinedIcon>
          <Typography color={theme.palette.neutral.medium}>{user.location}</Typography>
        </Box>
        <Box display='flex' alignItems='flex-start' gap='1rem'>
          <DescriptionOutlinedIcon color='primary'></DescriptionOutlinedIcon>
          <Box>
            <Typography color={theme.palette.neutral.medium}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, excepturi rerum facere similique eos fugiat?</Typography>
            <Typography color={theme.palette.neutral.mediumMain}>See more...</Typography>
          </Box>
        </Box>
      </Box>
    </StyledWrapper>
  )
}