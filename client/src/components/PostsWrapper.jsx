import { SinglePostWrapper } from "./SinglePostWrapper";

export function PostsWrapper() {
  return (
    <>
      <div>PostsWrapper component, this will contain all posts</div>
      <SinglePostWrapper></SinglePostWrapper>
      <SinglePostWrapper></SinglePostWrapper>
      <SinglePostWrapper></SinglePostWrapper>
    </>
  )
}