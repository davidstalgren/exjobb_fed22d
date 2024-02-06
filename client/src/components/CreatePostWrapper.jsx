import { Box } from "@mui/system";
import { StyledWrapper } from "./styled/StyledWrapper";
import { BoxSpaced, BoxSpacedColumn } from "./styled/StyledBox";
import { ProfileImage } from "./ProfileImage";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Dropzone from "react-dropzone";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { setPosts } from "../store/reducers/reducers";


export function CreatePostWrapper() {
  const [post, setPost] = useState('');
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width: 900px)')
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token)

  async function handleCreatePost() {
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('content', post);
    if(image) {
      formData.append('contentPictureUrl', image.name);
      formData.append('pictureFile', image);
    }

    const createNewPost = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: 'POST',
      headers: {Authorization: `Token ${token}`},
      body: formData
    });

    const newFeed = await createNewPost.json();
    dispatch(setPosts({ posts: newFeed }));
    setImage(null);
    setPost('');
  }

  return (
    <StyledWrapper>
      <BoxSpaced gap='1rem' marginBottom='1rem'>
        {isDesktop ? (<ProfileImage pictureUrl={user.pictureUrl}></ProfileImage>) : (<></>)}
        <TextField id='createPost'
              label={isDesktop ? 'Share a post with your green knowledge!' : 'Share your knowledge!'}
              multiline
              minRows={1}
              maxRows={4}
              variant="outlined"
              fullWidth
              value={post} 
              onChange={(e) => {setPost(e.target.value)}}
              sx={{backgroundColor: theme.palette.neutral.light, borderRadius: '0.25rem'}}
            />
      </BoxSpaced>
      <Box marginBottom='1rem'>
        <Dropzone multiple={false} onDrop={(acceptedFiles) => {
            setImage(acceptedFiles[0]);
            setImagePreview(URL.createObjectURL(acceptedFiles[0]));
          }}>
          {({ getRootProps, getInputProps }) => (
            <BoxSpaced>
              <Box {...getRootProps()} width='100%' border={`1px dotted ${theme.palette.neutral.medium}`} padding='1rem' borderRadius='0.25rem' sx={{ '&:hover': { cursor: 'pointer', border: '1px solid'} }}>
                <input {...getInputProps()} />
                {!image ? (
                  <BoxSpaced gap='2rem'>
                    <Typography>Add an image here, click or drag and drop</Typography>
                    <BoxSpaced gap='1rem'>
                      <Divider orientation="vertical" variant="middle" flexItem aria-hidden="true"/>
                      <BoxSpacedColumn gap='2rem'>
                        <InsertPhotoIcon fontSize='large' color='primary'/>
                        <CameraAltOutlinedIcon fontSize='large' color='primary'/>
                      </BoxSpacedColumn>
                    </BoxSpaced>
                  </BoxSpaced>
                ) : (
                  <BoxSpaced>
                    <Box>
                      <Box component='img' src={imagePreview} alt='Preview of chosen file' width={isDesktop ? '10rem' : '50%' } borderRadius='0.25rem'/>
                    </Box>
                    <BoxSpaced gap='1rem'>
                      <Divider orientation="vertical" variant="middle" flexItem aria-hidden="true"/>
                      <BoxSpacedColumn gap='2rem'>
                        <ModeEditIcon fontSize='large' color='primary'/>
                        <DeleteOutlineOutlinedIcon fontSize='large' color='primary' onClick={() => {setImage(null)}} />
                      </BoxSpacedColumn>
                    </BoxSpaced>
                  </BoxSpaced>
                )}
              </Box>
            </BoxSpaced>
          )}
        </Dropzone>
      </Box>
      <Divider></Divider>
      <Box marginTop='1rem'>
        <Button onClick={handleCreatePost} fullWidth disabled={!post} sx={{ padding: '1rem', backgroundColor: theme.palette.primary.main, color: theme.palette.background.alt, '&:hover': {color: theme.palette.primary.main, backgroundColor: theme.palette.primary.light}}}>
          Post
        </Button>
      </Box>
    </StyledWrapper>
  )
}