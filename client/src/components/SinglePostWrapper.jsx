import { Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { BoxSpaced } from "./styled/StyledBox";
import { StyledWrapper } from "./styled/StyledWrapper";
import { Box, useTheme } from "@mui/system";
import { ProfileImage } from "./ProfileImage";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import { useNavigate } from "react-router-dom";
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useState } from "react";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../store/reducers/reducers";
import SendIcon from '@mui/icons-material/Send';

export function SinglePostWrapper({ id, userId, firstName, lastName, location, userPictureUrl, content, contentPictureUrl, likes, comments }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const activeUserId = useSelector((state) => state.user._id);
  const haveLiked = Boolean(likes[activeUserId]);
  const haveLikedCount = Object.keys(likes).length;
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [comment, setComment] = useState('');

  async function likeUnlikePost() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}/like`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: activeUserId })
    });
    const newPostLikeStatus = await response.json();
    dispatch(setPost({post: newPostLikeStatus}));
  }

  async function addComment() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}/comment/add`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        userId: activeUserId,
        commentToAdd: comment
      })
    });
    const newPostCommentStatus = await response.json();
    dispatch(setPost({post: newPostCommentStatus}));
    setComment('');
  }

  return (
    <StyledWrapper margin='1rem 0rem 1rem 0rem'>
      <BoxSpaced marginBottom='1rem'>
        <BoxSpaced gap='1rem' onClick={() => {navigate(`/profile/${userId}`)}} sx={{ '&:hover': { cursor: 'pointer' } }}>
          <ProfileImage pictureUrl={userPictureUrl} size="3rem"></ProfileImage>
          <Box>
            <Typography color={theme.palette.primary.dark}>{firstName} {lastName}</Typography>
            <Typography fontSize='small' color={theme.palette.primary.dark}>{location}</Typography>
          </Box>
        </BoxSpaced>
        <BoxSpaced gap='1rem'>
          <IconButton onClick={() => { console.log(`add friend ${firstName} ${lastName} with Id:${userId}`) }}>
            <PersonAddOutlinedIcon
              color="primary"
              sx={{ '&:hover': { cursor: 'pointer' } }}>
            </PersonAddOutlinedIcon>
          </IconButton>
          <IconButton onClick={() => { console.log(`remove friend ${firstName} ${lastName} with Id:${userId}`) }}>
            <PersonRemoveOutlinedIcon
              color="primary"
              sx={{ '&:hover': { cursor: 'pointer' } }}>
            </PersonRemoveOutlinedIcon>
          </IconButton>
        </BoxSpaced>
      </BoxSpaced>
      <Typography marginBottom='0.5rem'>
        {content}
      </Typography>
      {contentPictureUrl && (
        <Box
          component='img'
          src={`${process.env.REACT_APP_API_URL}/assets/${contentPictureUrl}`}
          alt='Post image'
          width='100%'
          borderRadius='0.25rem' />
      )}
      <BoxSpaced marginBottom='0.5rem'>
        <BoxSpaced>
          <IconButton onClick={likeUnlikePost}>
            {haveLiked ? (
              <StarOutlinedIcon sx={{ color: theme.palette.primary.dark }}></StarOutlinedIcon>
            ) : (
              <StarBorderOutlinedIcon sx={{ color: theme.palette.primary.main }}></StarBorderOutlinedIcon>
            )}
          </IconButton>
          <Typography color={theme.palette.primary.dark}>
            {haveLikedCount} likes
          </Typography>
        </BoxSpaced>
        <BoxSpaced onClick={() => setShowComments(!showComments)} sx={{ '&:hover': { cursor: 'pointer' } }}>
          <Typography color={theme.palette.primary.dark}>
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </Typography>
          <IconButton onClick={() => setShowComments(!showComments)}>
            {showComments ? (
              <ChatOutlinedIcon sx={{ color: theme.palette.primary.dark }}></ChatOutlinedIcon>
            ) : (
              <ChatBubbleOutlineOutlinedIcon sx={{ color: theme.palette.primary.main }}></ChatBubbleOutlineOutlinedIcon>
            )}
          </IconButton>
        </BoxSpaced>
      </BoxSpaced>
      {showComments && (
        <Box>
          {comments.map((comment, index) =>
            <Box key={index}>
              <Divider flexItem></Divider>
              <Box margin='0.5rem 0rem 0.5rem 0rem' display='flex' flexDirection='column' justifyContent='flex-start'>
                <Box display='flex' justifyContent='flex-start' gap='1rem'>
                  <ProfileImage pictureUrl={comment.pictureUrl} size="2rem"></ProfileImage>
                  <Typography color={theme.palette.primary.dark}>
                    {comment.firstName} {comment.lastName}
                  </Typography>
                </Box>
                <Box paddingLeft='3rem'>
                  <Typography>
                    {comment.comment}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          <Divider flexItem></Divider>
          <BoxSpaced marginTop='1rem'>
            <TextField id="standard-multiline-flexible"
              label="Add your comment ..."
              multiline
              maxRows={4}
              variant="filled"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={addComment} sx={{ position: "relative", bottom: '0.5rem'}}>
                      <SendIcon sx={{ color: theme.palette.primary.dark }}></SendIcon>
                    </IconButton>
                  </InputAdornment>
                )
              }}
              value={comment} 
              onChange={(e) => {setComment(e.target.value)}}
            />
          </BoxSpaced>
        </Box>
      )}
    </StyledWrapper>
  )
}