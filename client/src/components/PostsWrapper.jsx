import { useDispatch, useSelector } from "react-redux";
import { SinglePostWrapper } from "./SinglePostWrapper";
import { useEffect, useState } from "react";
import { setPosts } from "../store/reducers/reducers";
import { Box } from "@mui/material";

export function PostsWrapper({profileId, profileView = false}) {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    
    async function getUserPosts() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${profileId}`, {
        method: 'GET',
        headers: {Authorization: `Token ${token}`}
      });
      const newPosts = await response.json();
      dispatch(setPosts({posts: newPosts}));
    }
    
    async function getAllPosts() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'GET',
        headers: {Authorization: `Token ${token}`}
      });
      const newPosts = await response.json();
      dispatch(setPosts({posts: newPosts}));
    }
    
    if (profileView) {
      getUserPosts()
    } else {
      getAllPosts()
    }
  },[])

  return (
    <Box display='flex' flexDirection='column-reverse'>
      {posts.map(({_id, userId, firstName, lastName, location, userPictureUrl, content, contentPictureUrl, likes, comments}) => (<SinglePostWrapper key={_id} id={_id} userId={userId} firstName={firstName} lastName={lastName} location={location} userPictureUrl={userPictureUrl} content={content} contentPictureUrl={contentPictureUrl} likes={likes} comments={comments}></SinglePostWrapper>))}
    </Box>
  )
}