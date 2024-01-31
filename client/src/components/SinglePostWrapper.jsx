import { Divider, IconButton, Typography } from "@mui/material";
import { BoxSpaced } from "./styled/StyledBox";
import { StyledWrapper } from "./styled/StyledWrapper";
import { Box, useTheme} from "@mui/system";
import { ProfileImage } from "./ProfileImage";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import { useNavigate } from "react-router-dom";
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useState } from "react";

export function SinglePostWrapper({ id, userId, firstName, lastName, location, userPictureUrl, content, contentPictureUrl, likes, comments }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [haveLiked, setHaveLiked] = useState(true);

  return (
    <StyledWrapper margin='1rem 0rem 1rem 0rem'>
      <BoxSpaced marginBottom='1rem'>
        <BoxSpaced gap='1rem' onClick={() => navigate(`/profile/${userId}`)} sx={{'&:hover': {cursor: 'pointer'}}}>
          <ProfileImage pictureUrl={userPictureUrl} size="3rem"></ProfileImage>
          <Box>
            <Typography color={theme.palette.primary.dark}>{firstName} {lastName}</Typography>
          </Box>
        </BoxSpaced>
        <BoxSpaced gap='1rem'>
          <IconButton>
            <PersonAddOutlinedIcon 
              color="primary" 
              onClick={() => {console.log(`add friend ${firstName} ${lastName} with Id:${userId}`)}} 
              sx={{'&:hover': {cursor: 'pointer'}}}>
            </PersonAddOutlinedIcon>
          </IconButton>
          <IconButton>
            <PersonRemoveOutlinedIcon 
              color="primary" 
              onClick={() => {console.log(`remove friend ${firstName} ${lastName} with Id:${userId}`)}} 
              sx={{'&:hover': {cursor: 'pointer'}}}>
            </PersonRemoveOutlinedIcon>
          </IconButton>
        </BoxSpaced>
      </BoxSpaced>
      <Typography>
        {content}
      </Typography>
      {contentPictureUrl && (
        <Box 
          component='img' 
          src={`${process.env.REACT_APP_API_URL}/assets/${contentPictureUrl}`} 
          alt='Post image' 
          width='100%' 
          borderRadius='0.25rem'/>
      )}
      <BoxSpaced>
        <IconButton>
          {haveLiked ? (
            <StarOutlinedIcon 
              sx={{color: theme.palette.primary.dark}} 
              onClick={() => {
                setHaveLiked(!haveLiked); 
                console.log(`remove like from postId: ${id}`);
              }}>
            </StarOutlinedIcon>
              ) : (
            <StarBorderOutlinedIcon 
              sx={{color: theme.palette.primary.main}}
              onClick={() => {
                setHaveLiked(!haveLiked); 
                console.log(`add like to postId: ${id}`);
              }}>
            </StarBorderOutlinedIcon>
          )}
        </IconButton>
        <IconButton>

        </IconButton>
      </BoxSpaced>
    </StyledWrapper>
  )
}