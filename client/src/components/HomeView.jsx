import { CreatePostWrapper } from "./CreatePostWrapper";
import { FriendsListWrapper } from "./FriendsListWrapper";
import { PostsWrapper } from "./PostsWrapper";
import { UserWrapper } from "./UserWrapper";

export function HomeView() {
  return (
    <>
      <div>HomeView component</div>
      <UserWrapper></UserWrapper>
      <CreatePostWrapper></CreatePostWrapper>
      <PostsWrapper></PostsWrapper>
      <FriendsListWrapper></FriendsListWrapper>
    </>
  )
}